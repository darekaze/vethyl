/* eslint-disable no-await-in-loop */
import { Eth } from 'web3x/eth'
import { Container } from 'typedi'
import { Logger } from 'pino'
import { formatBlock, formatTxnsWithReceipts, fetchUncles } from './utils'
import { BlockService, TxnService, BalanceService } from '../services'
import config from '../config'

const BLOCK_BUFFER = 6
const SYNC_LIMIT = 1000

// Sync Blockchain
async function syncBlockchain() {
  const logger = Container.get<Logger>('logger')
  const eth = Container.get<Eth>('web3')
  const blockServiceInstance = Container.get(BlockService)
  const txnServiceInstance = Container.get(TxnService)
  const balanceServiceInstance = Container.get(BalanceService)

  try {
    // Get geth latest block number and minus buffer zone
    const ethBlockHead = (await eth.getBlockNumber()) - BLOCK_BUFFER
    const dbBlockHead = await blockServiceInstance.getBlockNumber()

    if (dbBlockHead >= ethBlockHead) {
      logger.info('Blockchain is at latest state..')
    } else {
      const start = dbBlockHead + 1
      // prettier-ignore
      const end = ethBlockHead - start > SYNC_LIMIT
        ? start + SYNC_LIMIT
        : ethBlockHead

      //* Sync start from here
      logger.info('Syncing from %d to %d', start, end)

      for (let n = start; n <= end; n += 1) {
        logger.info('Fetching block %d.', n)
        const block = await eth.getBlock(n, true)

        // Fetch and format data
        const [formattedBlock, formattedTxns, uncleInfos] = await Promise.all([
          formatBlock(block),
          formatTxnsWithReceipts(block.transactions, block.timestamp),
          fetchUncles(block.uncles),
        ])

        logger.info('Inserting block to db: %s', formattedBlock.hash)
        await Promise.all([
          blockServiceInstance.insertBlock(formattedBlock),
          txnServiceInstance.insertBlockTxns(formattedTxns),
          balanceServiceInstance.updateBalances(
            formattedBlock,
            formattedTxns,
            uncleInfos,
          ),
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
  setTimeout(syncBlockchain, 5000)
}
