import mongoose from 'mongoose'

export const TransactionSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  from: { type: String, index: true },
  to: { type: String, index: true },
  doneAt: { type: Date, index: true },
  gas: Number,
  gasPrice: Number,
  input: String,
  nonce: Number,
  transactionIndex: Number,
  r: String,
  s: String,
  v: String,
  value: String,
})
