package dev.darekaze.ethcc.ethereum;

import dev.darekaze.ethcc.core.ChainBuffer;
import org.ethereum.core.Block;
import org.ethereum.core.TransactionReceipt;
import org.ethereum.listener.EthereumListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class EthListener extends EthereumListenerAdapter {
  private Logger logger = LoggerFactory.getLogger(EthListener.class);
  private ChainBuffer chainBuffer;

  EthListener(ChainBuffer chainBuffer) {
    this.chainBuffer = chainBuffer;
  }

  @Override
  public void onBlock(Block block, List<TransactionReceipt> receipts) {
    chainBuffer.push(block, receipts);
    logger.info("Block {} successfully pushed to chain buffer", block.getNumber());
  }

  @Override
  public void onSyncDone(SyncState state) {
    logger.info(" ** SYNC DONE ** ");
  }
}
