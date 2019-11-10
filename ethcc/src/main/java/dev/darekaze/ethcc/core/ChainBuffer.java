package dev.darekaze.ethcc.core;

import org.ethereum.core.Block;
import org.ethereum.core.TransactionReceipt;
import org.ethereum.util.ByteUtil;
import org.redisson.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class ChainBuffer {
  private Logger logger = LoggerFactory.getLogger(ChainBuffer.class);
  private RBlockingQueue<Block> receivedQueue;
  private RBlockingDeque<Block> verifiedQueue;
  private RLocalCachedMap<String, List<TransactionReceipt>> blockReceipts;
  private RLocalCachedMap<String, Block> validateMap;

  private Thread blockValidationThread; // TODO: make it for gracefully shutdown

  public ChainBuffer(RedissonClient redisson) {
    this.receivedQueue = redisson.getBlockingQueue("receivedQueue");
    this.verifiedQueue = redisson.getBlockingDeque("verifiedQueue");
    this.blockReceipts = redisson.getLocalCachedMap("blockReceipts", LocalCachedMapOptions.defaults());
    this.validateMap = redisson.getLocalCachedMap("validateMap", LocalCachedMapOptions.defaults());

    // Perform validation in a thread
    this.blockValidationThread = new Thread(this::validateBlock, "blockValidationThread");
    this.blockValidationThread.start();
  }

  /**
   * Receive block from ethereumj and push to redis queue.
   * @param block ethereum Block object
   * @param receipts List of ethereum transaction receipts
   */
  public void push(Block block, List<TransactionReceipt> receipts) {
    String blockHash = ByteUtil.toHexString(block.getHash());
    this.receivedQueue.addAsync(block);
    this.blockReceipts.putAsync(blockHash, receipts);
  }

  /**
   * Runnable thread to validate ethereum block.
   * This should be blocking to ensure safe check
   */
  private void validateBlock() {
    while(!Thread.interrupted()) {
      try {
        Block block = this.receivedQueue.take();
        String hash = ByteUtil.toHexString(block.getHash());
        String parentHash = ByteUtil.toHexString(block.getParentHash());

        validateMap.put(hash, block);

        // TODO: arara
        // if use reactive i can subscribe to listen on change..
        //...how to validate.......
        // onBlock received whether old or current... need to confirm
        // copy from uncletong code first and investigate
        // don't forget to add logger..
        // check if queue length > 5
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}
