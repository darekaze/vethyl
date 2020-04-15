import { Document } from 'mongoose'
import { Address } from 'web3x/address'

export type DbTransaction = {
  hash: string
  blockHash: string | null
  blockNumber: number | null
  doneAt: number // timestamp in ms
  from: Address
  to: Address | null
  value: string
  gas: number
  gasPrice: string
  gasUsed: string
  nonce: number
  transactionIndex: number | null
  input: string
  status?: string
  contractAddress?: string
}

export type ITransaction = {
  hash: string
  blockHash: string | null
  blockNumber: number | null
  doneAt: Date
  from: string // converted from Address
  to: string | null // converted from Address
  value: string
  gas: number
  gasPrice: number
  gasUsed: number // from receipts
  nonce: number
  transactionIndex: number | null
  input: string
  status?: string // from receipts
  contractAddress?: string // from receipts
} & Document
