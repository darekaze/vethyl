import mongoose from 'mongoose'
import { IBalanceRecord } from 'src/@types'

const BalanceRecordSchema = new mongoose.Schema({
  address: { type: String, index: true },
  time: { type: Date, index: true },
  income: Number,
  expense: Number,
  exchange: Number,
  balance: Number,
})

export default mongoose.model<IBalanceRecord>('BalanceRecord', BalanceRecordSchema)
