import { Document, Types } from 'mongoose'

export type DbBalanceState = {
  address: string
  balance: string // Big
  updateAt: number
}

export type IBalanceState = {
  address: string
  balance: Types.Decimal128
  updateAt: Date
} & Document
