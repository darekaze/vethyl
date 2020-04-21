import mongoose from 'mongoose'
import { IBalanceState } from 'src/@types'

const BalanceStateSchema = new mongoose.Schema({
  address: { type: String, index: true },
  balance: mongoose.Types.Decimal128,
  updateAt: Date,
})

export default mongoose.model<IBalanceState>('BalanceState', BalanceStateSchema)
