import { Document } from 'mongoose'

export type DbBalanceRecord = {
  address: string
  time: number
  income: number
  expence: number
  exchange: number
  balance: number
}

export type IBalanceRecord = DbBalanceRecord & { time: Date } & Document
