import { Document } from 'mongoose'

export type DbBalanceState = {
  address: string
  balance: number
  updateAt: number
}

export type IBalanceState = DbBalanceState & { updateAt: Date } & Document
