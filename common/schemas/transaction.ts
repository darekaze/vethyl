import mongoose from 'mongoose'

export const TransactionSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  doneAt: { type: Date, index: true },
  from: { type: String, index: true },
  to: { type: String, index: true },
  value: String,
  gas: Number,
  gasPrice: String,
  gasUsed: Number, // -- receipts
  nonce: Number,
  transactionIndex: Number,
  input: String,
  status: Boolean, // -- receipts
  contractAddress: String, // -- receipts
})
