import mongoose from 'mongoose'
import { ITransaction } from 'src/@types/ITransaction'
import { Address } from 'web3x/address'

const TxnSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  from: { type: String, set: (v: Address) => v.toString() }, // index?
  to: { type: String, set: (v: Address) => v.toString() }, // index?
  doneAt: { type: Date, set: (v: number) => new Date(v) }, // index?
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
