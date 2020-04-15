import { Eth } from 'web3x/eth'
import { BlockResponse, TransactionResponse } from 'web3x/formatters'
import { bufferToHex } from 'web3x/utils'
import { Container } from 'typedi'
import { omit } from 'lodash'
import { DbBlock, DbTransaction, UncleInfo } from 'src/@types'

export const formatBlock = async (
  block: BlockResponse<TransactionResponse>,
): Promise<DbBlock> => {
  const minedAt = block.timestamp * 1000
  const transactions = block.transactions.map((tx) => tx.hash)
  const filteredBlock = omit(block, 'logsBloom')
  return {
    ...filteredBlock,
    hash: bufferToHex(block.hash),
    parentHash: bufferToHex(block.parentHash),
    nonce: bufferToHex(block.nonce),
    sha3Uncles: bufferToHex(block.sha3Uncles),
    transactionsRoot: bufferToHex(block.transactionsRoot),
    stateRoot: bufferToHex(block.stateRoot),
    receiptsRoot: bufferToHex(block.receiptsRoot),
    miner: block.miner.toString(),
    extraData: bufferToHex(block.extraData),
    minedAt,
    transactions,
  }
}

export const formatTxnsWithReceipts = async (
  txns: TransactionResponse[],
  timestamp: number,
): Promise<DbTransaction[]> => {
  if (txns.length < 1) return null

  const eth = Container.get<Eth>('web3')

  const formattedTxns = txns.map(
    async (txn): Promise<DbTransaction> => {
      const receipts = await eth.getTransactionReceipt(txn.hash)
      const { gasUsed, status, contractAddress } = receipts
      const filteredTxn = omit(txn, ['v', 'r', 's'])
      return {
        ...filteredTxn,
        doneAt: timestamp * 1000,
        gasUsed,
        status,
        contractAddress,
      }
    },
  )
  return Promise.all(formattedTxns)
}

export const fetchUncles = async (
  block: number,
  uncleCount: number,
): Promise<UncleInfo[]> => {
  if (uncleCount < 1) return null

  const eth = Container.get<Eth>('web3')

  const uncles = [...Array(uncleCount).keys()].map(
    async (index): Promise<UncleInfo> => {
      const { number, miner } = await eth.getUncle(block, index)
      return {
        uncleHeight: number,
        unclePosition: index,
        blockHeight: block,
        miner,
      }
    },
  )
  return Promise.all(uncles)
}
