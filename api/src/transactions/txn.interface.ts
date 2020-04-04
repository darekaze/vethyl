import { Document } from 'mongoose'

export interface Transaction extends Document {
  readonly hash: string
  readonly blockHash: string
  readonly blockNumber: number
  readonly from: string // converted from Address
  readonly to: string | null // converted from Address
  readonly doneAt: Date
  readonly gas: number
  readonly gasPrice: number
  readonly input: string
  readonly nonce: number
  readonly transactionIndex: number | null
  readonly value: string
  readonly v: string
  readonly r: string
  readonly s: string
}
