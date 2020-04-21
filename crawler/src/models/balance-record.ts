import mongoose from 'mongoose'
import { IBalanceRecord } from 'src/@types'

const BalanceRecordSchema = new mongoose.Schema({
  address: { type: String, index: true },
  time: { type: Date, index: true },
  income: mongoose.Types.Decimal128,
  expense: mongoose.Types.Decimal128,
  exchange: mongoose.Types.Decimal128,
  balance: mongoose.Types.Decimal128,
})

export default mongoose.model<IBalanceRecord>('BalanceRecord', BalanceRecordSchema)
