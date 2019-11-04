package dev.darekaze.ethcc.ethereum;

import org.ethereum.facade.Ethereum;
import org.ethereum.facade.EthereumFactory;

public class EthBean {
  private Ethereum ethereum;
  // TODO: add redisson here

  public void start() {
    this.ethereum = EthereumFactory.createEthereum();
    this.ethereum.addListener(new EthListener()); // TODO: pass in redisson client
  }
}
