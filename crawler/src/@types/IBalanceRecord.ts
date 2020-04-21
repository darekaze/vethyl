import { Document } from 'mongoose'

export type DbBalanceRecord = {
  address: string
  time: number
  income: string // Big
  expence: string // Big
  exchange: string // Big
  balance: string // Big
}

export type IBalanceRecord = DbBalanceRecord & { time: Date } & Document
