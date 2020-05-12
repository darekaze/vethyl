import mongoose from 'mongoose'

export const BalanceStateSchema = new mongoose.Schema({
  address: { type: String, index: true },
  balance: mongoose.Types.Decimal128,
  updateAt: Date,
})
