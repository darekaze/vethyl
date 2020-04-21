import mongoose from 'mongoose'
import { ITransaction } from 'src/@types'

const TxnSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  doneAt: { type: Date, index: true },
  from: { type: String, index: true },
  to: { type: String, index: true },
  value: String, // Big
  gas: Number,
  gasPrice: String, // Big
  gasUsed: Number, // -- receipts
  nonce: Number,
  transactionIndex: Number,
  input: String,
  status: Boolean, // -- receipts
  contractAddress: String, // -- receipts
})

export default mongoose.model<ITransaction>('Transaction', TxnSchema)
