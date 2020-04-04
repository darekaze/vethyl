import mongoose from 'mongoose'

export const BlockSchema = new mongoose.Schema({
  number: { type: Number, index: true },
  hash: { type: String, unique: true, index: true },
  parentHash: String,
  nonce: String,
  sha3Uncles: String,
  logsBloom: String,
  transactionsRoot: String,
  stateRoot: String,
  receiptsRoot: String,
  miner: String,
  difficulty: String,
  totalDifficulty: String,
  extraData: String,
  size: Number,
  gasLimit: Number,
  gasUsed: Number,
  timestamp: Number,
  transactions: [String],
  uncles: [String],
})
