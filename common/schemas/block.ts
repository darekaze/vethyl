import mongoose from 'mongoose'

export const BlockSchema = new mongoose.Schema({
  number: { type: Number, index: true },
  hash: { type: String, unique: true, index: true },
  parentHash: String,
  nonce: String,
  sha3Uncles: String,
  transactionsRoot: String,
  stateRoot: String,
  receiptsRoot: String,
  miner: { type: String, index: true },
  difficulty: String,
  totalDifficulty: String,
  extraData: String,
  size: Number,
  gasLimit: Number,
  gasUsed: Number,
  timestamp: Number,
  minedAt: { type: Date, index: true },
  transactions: [String],
  uncles: [String],
})
