import { BlockResponse } from 'web3x/formatters'
import { bufferToHex } from 'web3x/utils'

export interface DbBlock {
  number: number | null
  hash: string | null
  parentHash: string
  nonce: string | null
  sha3Uncles: string
  logsBloom: string | null
  transactionsRoot: string
  stateRoot: string
  receiptsRoot: string
  miner: string
  difficulty: string // BigInt
  totalDifficulty: string // BigInt
  extraData: string // Can be decode to string
  size: number
  gasLimit: number
  gasUsed: number
  timestamp: number
  transactions: string[]
  uncles: string[]
}

export const transformBlock = (block: BlockResponse<Buffer>) => {
  const txHexList = block.transactions.map((tx: Buffer) => bufferToHex(tx))
  const transBlock: DbBlock = {
    ...block,
    hash: bufferToHex(block.hash),
    parentHash: bufferToHex(block.parentHash),
    nonce: bufferToHex(block.nonce),
    sha3Uncles: bufferToHex(block.sha3Uncles),
    logsBloom: bufferToHex(block.logsBloom),
    transactionsRoot: bufferToHex(block.transactionsRoot),
    stateRoot: bufferToHex(block.stateRoot),
    receiptsRoot: bufferToHex(block.receiptsRoot),
    miner: block.miner.toString(),
    extraData: bufferToHex(block.extraData),
    transactions: txHexList,
  }
  return transBlock
}
