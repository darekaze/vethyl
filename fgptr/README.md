# fpgen

Fingerprint generator

- node-cron (scheduler, for generating future fingerprint)
- sha3 library (create fingerprint)
- mongoose (to store fingerprint info)
- web3 (to store fingerprints to goerli testnet)

<!-- use block range (interval: 1000, dev: 10) -->

Format for mongoose:
```js
{
  block_start // inclusive
  block_end // inclusive
  fingerprint
  cumulativeFingerprint
  transactionHash
}
```
