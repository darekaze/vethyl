import { BlockResponse, TransactionResponse } from 'web3x/formatters'
import { bufferToHex } from 'web3x/utils'
import { DbBlock } from './@types/IBlock'

export const transformBlock = (block: BlockResponse<TransactionResponse>) => {
  const txHexList = block.transactions.map(tx => tx.hash)
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
