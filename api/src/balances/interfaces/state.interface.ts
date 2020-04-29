import { Document, Types } from 'mongoose'

export interface BalanceState extends Document {
  readonly address: string
  readonly balance: Types.Decimal128
  readonly updateAt: Date
}
