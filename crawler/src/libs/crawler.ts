/* eslint-disable no-await-in-loop */
import { Eth } from 'web3x/eth'
import { Container } from 'typedi'
import { Logger } from 'pino'

import { BlockService, TxnService } from '../services'
import { transformBlock } from '../utils'
import config from '../config'

const BLOCK_BUFFER = 6
const SYNC_LIMIT = 1000

// Sync Blockchain
async function syncBlockchain() {
  const logger = Container.get<Logger>('logger')
  const eth = Container.get<Eth>('web3')
  try {
    const blockServiceInstance = Container.get(BlockService)
    const txnServiceInstance = Container.get(TxnService)

    // Get geth latest block number and minus [6] for buffer zone
    const ethBlockHead = (await eth.getBlockNumber()) - BLOCK_BUFFER
    const dbBlockHead = await blockServiceInstance.getBlockNumber()

    // Start sync
    if (dbBlockHead >= ethBlockHead) {
      logger.info('Blockchain is at latest state..')
    } else {
      const start = dbBlockHead + 1
      // prettier-ignore
      const end = ethBlockHead - start > SYNC_LIMIT
        ? start + SYNC_LIMIT
        : ethBlockHead

      logger.info('Syncing from %d to %d', start, end)

      for (let n = start; n <= end; n += 1) {
        logger.info('Fetching block %d.', n)
        const block = await eth.getBlock(n, true)

        const { transactions, timestamp } = block
        const formattedBlock = transformBlock(block)

        // @TODO: add receipts service later
        logger.debug('Inserting block to db: %o', block)
        await Promise.all([
          blockServiceInstance.insertBlock(formattedBlock),
          txnServiceInstance.insertBlockTxns(transactions, timestamp),
        ])
      }

      logger.info('Finish sync process, db head: %d', end)
    }
  } catch (err) {
    logger.error('🔥 error: %o', err)
  }
  // End sync and repeat after interval
  logger.info('Pending to sync..')
  setTimeout(syncBlockchain, config.syncInterval)
}

export default async () => {
  setTimeout(syncBlockchain, config.syncInterval)
}
