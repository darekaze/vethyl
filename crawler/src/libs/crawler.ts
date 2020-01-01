// 1. get geth latest block number and minus [6] for buffer zone
// 2. get db highest block number
// 3.1 If db highest block < geth latest block - buffer, loop to fetch missing block
// 3.2 else do nothing
// 4. loop it

// storeBlocksToDb(self, start_number, end_number):


import ms from 'ms'
import { Eth } from 'web3x/eth'
import { transformBlock } from '../utils'

// Split the loader somewhere else
const INTERVAL = ms('15s')
const BLOCK_START = parseInt(process.env.BLOCK_START, 10)

console.log(`Starting from: ${BLOCK_START}`)

// TODO: implement sync block feature
async function syncBlockchain(eth: Eth) {
  try {
    // const latestBlock = await eth.getBlockNumber()
    const block = await eth.getBlock(9194197)

    console.dir(block)
    console.dir(transformBlock(block))
  } catch (err) {
    console.log(err)
  }
  setTimeout(client => syncBlockchain(client), INTERVAL, eth)
}

export default async (eth: Eth) => {
  setTimeout(client => syncBlockchain(client), INTERVAL, eth)
}
