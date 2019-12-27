package dev.darekaze.ethcc.ethereum;

import dev.darekaze.ethcc.core.ChainBuffer;
import org.ethereum.core.BlockSummary;
import org.ethereum.listener.EthereumListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EthListener extends EthereumListenerAdapter {
  private Logger logger = LoggerFactory.getLogger(EthListener.class);
  private ChainBuffer chainBuffer;

  EthListener(ChainBuffer chainBuffer) {
    this.chainBuffer = chainBuffer;
  }

  @Override
  public void onBlock(BlockSummary blockSummary) {
    chainBuffer.push(blockSummary);
    logger.info("Block {} successfully pushed to chain buffer", blockSummary.getBlock().getNumber());
  }

  @Override
  public void onSyncDone(SyncState state) {
    logger.info(" ** SYNC DONE ** ");
  }
}
