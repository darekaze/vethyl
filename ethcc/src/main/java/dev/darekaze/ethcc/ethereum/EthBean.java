package dev.darekaze.ethcc.ethereum;

import dev.darekaze.ethcc.core.ChainBuffer;
import org.ethereum.facade.Ethereum;
import org.ethereum.facade.EthereumFactory;

public class EthBean {
  private Ethereum ethereum;
  private ChainBuffer chainBuffer;

  public EthBean(ChainBuffer chainBuffer) {
    this.chainBuffer = chainBuffer;
  }

  public void start() {
    this.ethereum = EthereumFactory.createEthereum();
    this.ethereum.addListener(new EthListener(chainBuffer));
  }

  @SuppressWarnings("unused")
  public void close() {
    this.ethereum.close();
  }
}
