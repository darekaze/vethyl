/* eslint-disable no-await-in-loop */
import { Eth } from 'web3x/eth'
import { Container } from 'typedi'
import { Logger } from 'pino'
import { BlockService, TxnService } from '../services'
import config from '../config'

// Generate fingerprint
async function fpGenerator() {
  const logger = Container.get<Logger>('logger')
  const eth = Container.get<Eth>('web3')
  const blockServiceInstance = Container.get(BlockService)
  const txnServiceInstance = Container.get(TxnService)
  // const fingerprintServiceInstance = Container.get(FingerprintService)
  const { blockInterval } = config

  try {
    // TODO: get lastFP
    const fpHead = -1 // TODO: get fpHead from lastFP
    const blockHead = await blockServiceInstance.getBlockNumber()

    // End process if conditions not met
    if (!(fpHead < blockHead && blockHead - fpHead >= blockInterval)) {
      logger.info('Pending for more blocks to generate new fingerprint')
      return
    }

    //* Generate new fingerprint
    for (
      let from = fpHead + 1;
      blockHead - from + 1 >= blockInterval;
      from += blockInterval
    ) {
      const to = from + blockInterval - 1

      logger.info('Generate fingerprint for %d to %d', from, to)

      // fetch block and transactions, make into one object
      // generate hash by sha3-256 with json.stringify

      // if lastFP exist, get latest cumulative fp and form new culFP, else make the fp cul.

      // verify fingerprint info with miner (skip it for now)
      // write it as a transaction, sign and send

      // when success, insert records to db
    }
    // End process and print next cronjob
    logger.info('Generator ends')
  } catch (err) {
    logger.error('🔥 error: %o', err)
  }
}

export default async () => {
  // Run the task once init
  fpGenerator()
  // Setup cron to run the task at given time
  // TODO: set procedure
}
