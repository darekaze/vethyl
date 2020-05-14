# Plan

Ref from crawler directory to create a validation nodejs program

- node-cron (scheduler, for generating future fingerprint)
- sha3 library (create fingerprint)
- mongoose (to store fingerprint info)
- web3 (to store fingerprints to goerli testnet)

<!-- use block range (interval: 1000, dev: 100) -->

some kind of format for mongoose:
```
{
  block_start (inclusive)
  block_end (inclusive)
  fingerprint
  cumulativeFingerprint
  transactionHash
}
```
