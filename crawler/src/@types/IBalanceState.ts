import { Document } from 'mongoose'

export type DbBalanceState = {
  address: string
  balance: string // Big
  updateAt: number
}

export type IBalanceState = DbBalanceState & { updateAt: Date } & Document
