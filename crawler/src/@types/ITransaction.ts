import { Document } from 'mongoose'
import { TransactionResponse } from 'web3x/formatters'

export type DbTransaction = TransactionResponse & {
  doneAt: number // timestamp
}

export type ITransaction = {
  hash: string
  blockHash: string
  blockNumber: number
  from: string // converted from Address
  to: string | null // converted from Address
  doneAt: Date // converted from timestamp
  gas: number
  gasPrice: number
  input: string
  nonce: number
  transactionIndex: number | null
  value: string
  v: string
  r: string
  s: string
} & Document
