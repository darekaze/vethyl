import { Document, Types } from 'mongoose'

export type DbBalanceRecord = {
  address: string
  time: number
  income: string // Big
  expense: string // Big
  balance: Types.Decimal128
}

export type IBalanceRecord = {
  address: string
  time: Date
  income: Types.Decimal128
  expense: Types.Decimal128
  balance: Types.Decimal128
} & Document
