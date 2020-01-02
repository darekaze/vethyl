// 1. get geth latest block number and minus [6] for buffer zone
// 2. get db highest block number
// 3.1 If db highest block < geth latest block - buffer, loop to fetch missing block
// 3.2 else do nothing
// 4. loop it

// storeBlocksToDb(self, start_number, end_number):

import { Eth } from 'web3x/eth'
import { Container } from 'typedi'
import { Logger } from 'pino'
import { transformBlock } from '../utils'
import config from '../config'

// TODO: implement sync block feature
async function syncBlockchain() {
  const logger = Container.get<Logger>('logger')
  const eth = Container.get<Eth>('web3')
  try {
    // const latestBlock = await eth.getBlockNumber()
    const block = await eth.getBlock(9194197)

    logger.info(transformBlock(block))
  } catch (err) {
    logger.error(err)
  }
  setTimeout(syncBlockchain, config.syncInterval)
}

export default async () => {
  setTimeout(syncBlockchain, config.syncInterval)
}
