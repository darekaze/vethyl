# Plan

Ref from crawler directory to create a validation nodejs program

- micro (health checkpoint)
- node-cron (scheduler)
- sha3 library (create fingerprint)
- mongoose (to store fingerprint info)
- web3 ?? (to store fingerprint to testnet?)

<!-- If there is a limit, need to think of another way (use block range instead?) -->

some kind of format for mongoose:
```
{
  date
  block_from (inclusive)
  block_to (inclusive)
  cumulativeHash
}
```
