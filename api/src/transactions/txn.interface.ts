import { Document } from 'mongoose'

export interface Transaction extends Document {
  readonly hash: string
  readonly blockHash: string
  readonly blockNumber: number
  readonly doneAt: Date
  readonly from: string // converted from Address
  readonly to: string | null // converted from Address
  readonly value: string
  readonly gas: number
  readonly gasPrice: string
  readonly gasUsed: number // from receipts
  readonly nonce: number
  readonly transactionIndex: number | null
  readonly input: string
  readonly status?: boolean // from receipts
  readonly contractAddress?: string // Address -- from receipts
}
