package dev.darekaze.ethcc.core;

import org.ethereum.core.Block;
import org.ethereum.core.BlockSummary;
import org.ethereum.util.ByteUtil;
import org.redisson.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;

public class ChainBuffer {
  private Logger logger = LoggerFactory.getLogger(ChainBuffer.class);
  private RMapCache<String, ArrayList<Long>> index;
  private RMapCache<String, BlockSummary> data;
  private RBlockingQueue<BlockSummary> receivedQueue;
  private RBlockingDeque<BlockSummary> verifiedQueue;

  @SuppressWarnings("FieldCanBeLocal")
  private Thread blockValidationThread;
  public static int FLUSH_SIZE_LIMIT = 6;
  public static int CACHE_SIZE_LIMIT = 10;

  public ChainBuffer(RedissonClient redisson) {
    this.receivedQueue = redisson.getBlockingQueue("receivedQueue");
    this.verifiedQueue = redisson.getBlockingDeque("verifiedQueue");
    this.index = redisson.getMapCache("indexMap");
    this.data = redisson.getMapCache("dataMap");

    // set maxSize to remove LRU block (which are unused block)
    this.index.setMaxSize(CACHE_SIZE_LIMIT);
    this.data.setMaxSize(CACHE_SIZE_LIMIT);

    // Perform validation in a thread
    this.blockValidationThread = new Thread(this::validateBlock, "blockValidationThread");
    this.blockValidationThread.start();
  }

  /**
   * Receive block from ethereumj and push to redis queue.
   * @param blockSummary ethereum BlockSummary object
   */
  public void push(BlockSummary blockSummary) {
    this.receivedQueue.addAsync(blockSummary);
  }

  /**
   * Runnable thread to validate ethereum block.
   * This should be blocking to ensure safe check
   */
  private void validateBlock() {
    while(!Thread.interrupted()) {
      try {
        BlockSummary summary = this.receivedQueue.take();
        Block block = summary.getBlock();
        String hash = ByteUtil.toHexString(block.getHash());
        String parentHash = ByteUtil.toHexString(block.getParentHash());
        long blockNumber = block.getNumber();

        logger.info("Adding block for validation, number: {} // hash: {} ", blockNumber, hash);
        data.put(hash, summary);
        index.put(hash, new ArrayList<>());

        while (index.containsKey(parentHash)) {
          Block parentBlock = data.get(parentHash).getBlock();
          ArrayList<Long> children = index.get(parentHash);
          if (!children.contains(blockNumber)) {
            children.add(blockNumber); // ? will it work with redisson, or we use MultiMap
            logger.info("!!! is it adding? ans: {}", index.get(parentHash).size()); // checking
          }
          parentHash = ByteUtil.toHexString(parentBlock.getParentHash());
        }

        flush();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  /**
   * Flush to validated queue if block is correct
   */
  private void flush() {
    // Deprecated on 12/2019, won't continue unless it got fixed
    logger.info("Currently does nothing..");
  }
}
