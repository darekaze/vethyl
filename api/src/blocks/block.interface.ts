import { Document } from 'mongoose'

export interface Block extends Document {
  readonly number: number
  readonly hash: string
  readonly parentHash: string
  readonly nonce: string
  readonly sha3Uncles: string
  readonly logsBloom: string | null
  readonly transactionsRoot: string
  readonly stateRoot: string
  readonly receiptsRoot: string
  readonly miner: string
  readonly difficulty: string // BigInt
  readonly totalDifficulty: string // BigInt
  readonly extraData: string // Can be decode to string
  readonly size: number
  readonly gasLimit: number
  readonly gasUsed: number
  readonly timestamp: number
  readonly transactions: string[]
  readonly uncles: string[]
}
