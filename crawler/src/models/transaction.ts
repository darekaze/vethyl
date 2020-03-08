import mongoose from 'mongoose'
import { ITransaction } from 'src/@types/ITransaction'
import { Address } from 'web3x/address'

const TxnSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  from: { type: String, index: true, set: (v: Address) => v.toString() },
  to: { type: String, index: true, set: (v: Address) => (v ? v.toString() : null) },
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

export default mongoose.model<ITransaction>('Transaction', TxnSchema)
