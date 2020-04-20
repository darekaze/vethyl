import { Document } from 'mongoose'

export type DbTransaction = {
  hash: string
  blockHash: string | null
  blockNumber: number | null
  doneAt: number // timestamp in ms
  from: string // Address
  to: string | null // Address
  value: string
  gas: number
  gasPrice: number // string to number
  gasUsed: number // from receipts
  nonce: number
  transactionIndex: number | null
  input: string
  status?: boolean // from receipts
  contractAddress?: string // Address -- from receipts
}

export type ITransaction = DbTransaction & { doneAt: Date } & Document
