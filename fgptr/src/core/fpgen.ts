/* eslint-disable no-await-in-loop */
import { Container } from 'typedi'
import { Logger } from 'pino'
import { schedule } from 'node-cron'
import { genCurrentFP, genCumulativeFP, signNewTxn } from './helpers'
import { BlockService, FingerprintService } from '../services'
import config from '../config'

// Generate fingerprint
async function fpGenerator() {
  const logger = Container.get<Logger>('logger')
  const blockServiceInstance = Container.get(BlockService)
  const fingerprintServiceInstance = Container.get(FingerprintService)
  const { blockInterval } = config

  logger.info('fpgen: Start: %s', new Date().toISOString())

  try {
    const [blockHead, fpHeadInfo] = await Promise.all([
      blockServiceInstance.getBlockNumber(),
      fingerprintServiceInstance.getLastestFpInfo(),
    ])
    const fpHead = fpHeadInfo.latestNum
    logger.info('Block head: %d, Fingerprint head: %d', blockHead, fpHead)

    // End process if conditions not met
    if (!(fpHead < blockHead && blockHead - fpHead >= blockInterval)) {
      logger.info('Require more blocks to generate new fingerprint')
      return
    }

    //* Generate new fingerprint
    let { cumulativeFingerprint } = fpHeadInfo

    for (
      let blockStart = fpHead + 1;
      blockHead - blockStart + 1 >= blockInterval;
      blockStart += blockInterval
    ) {
      const blockEnd = blockStart + blockInterval - 1
      logger.info('Generate fingerprint for %d to %d', blockStart, blockEnd)

      const fingerprint = await genCurrentFP(blockStart, blockEnd)
      cumulativeFingerprint = genCumulativeFP(cumulativeFingerprint, fingerprint)

      /* verify fingerprint info with miner (skip it for now) */

      // Write it as a transaction, sign and send
      const fpRecord = await signNewTxn({
        blockStart,
        blockEnd,
        fingerprint,
        cumulativeFingerprint,
      })

      // Insert fingerprint to db
      await fingerprintServiceInstance.insertFingerprint(fpRecord)
    }
    // End process and print next cronjob
    logger.info('Fingerprint Generation ends')
  } catch (err) {
    logger.error('🔥 error: %o', err)
  }
}

export default async () => {
  const logger = Container.get<Logger>('logger')
  const { cronSchedule } = config

  logger.info('fpgen: Initial run')
  await fpGenerator()

  schedule(cronSchedule, fpGenerator)
  logger.info('fpgen: Cron scheduled: %s', cronSchedule)
}
