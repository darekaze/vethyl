import { Document, Types } from 'mongoose'

export interface BalanceRecord extends Document {
  readonly address: string
  readonly time: Date
  readonly income: Types.Decimal128
  readonly expense: Types.Decimal128
  readonly balance: Types.Decimal128
}
