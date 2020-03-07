import { Document } from 'mongoose'

export type DbTransaction = {
  hash: string
  blockHash: string | null
  blockNumber: number | null
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
}

export type ITransaction = DbTransaction & Document
