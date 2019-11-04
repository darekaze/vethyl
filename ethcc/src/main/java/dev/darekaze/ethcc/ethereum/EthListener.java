package dev.darekaze.ethcc.ethereum;

import org.ethereum.core.Block;
import org.ethereum.core.TransactionReceipt;
import org.ethereum.listener.EthereumListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class EthListener extends EthereumListenerAdapter {
  private Logger logger = LoggerFactory.getLogger(EthListener.class);
  // TODO: pass in redisson client

  @Override
  public void onBlock(Block block, List<TransactionReceipt> receipts) {
    logger.info("Block received: " + block.getNumber());
    // TODO: add block and receipts to redis
  }

  @Override
  public void onSyncDone(SyncState state) {
    logger.info(" ** SYNC DONE ** ");
  }
}