import mongoose from 'mongoose'

export const BalanceRecordSchema = new mongoose.Schema({
  address: { type: String, index: true },
  time: { type: Date, index: true },
  income: mongoose.Types.Decimal128,
  expense: mongoose.Types.Decimal128,
  balance: mongoose.Types.Decimal128,
})
