import { Types } from 'mongoose'

export type DbBlock = {
  number: number
  hash: string
  parentHash: string
  nonce: string
  sha3Uncles: string
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
  minedAt: number
  transactions: string[]
  uncles: string[]
}

export type DbTransaction = {
  hash: string
  blockHash: string | null
  blockNumber: number | null
  doneAt: number // timestamp in ms
  from: string // Address
  to: string | null // Address
  value: string // big
  gas: number
  gasPrice: string // big
  gasUsed: number // from receipts
  nonce: number
  transactionIndex: number | null
  input: string
  status?: boolean // from receipts
  contractAddress?: string // Address -- from receipts
}

export type DbBalanceState = {
  address: string
  balance: string // Big
  updateAt: number
}

export type DbBalanceRecord = {
  address: string
  time: number
  income: string // Big
  expense: string // Big
  balance: Types.Decimal128
}
