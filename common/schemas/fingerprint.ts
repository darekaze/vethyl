import mongoose from 'mongoose'

export const FingerprintSchema = new mongoose.Schema({
  blockStart: { type: Number, index: true },
  blockEnd: { type: Number, index: true },
  fingerprint: String,
  cumulativeFingerprint: String,
  transactionHash: String,
})
