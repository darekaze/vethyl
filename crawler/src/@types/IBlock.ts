import { Document } from 'mongoose'

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

export type IBlock = DbBlock & Document
