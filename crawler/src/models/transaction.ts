import mongoose, { Document } from 'mongoose'
import { DbTransaction } from 'src/@types/interfaces'
import { Address } from 'web3x/address'

export type ITransaction = DbTransaction & Document

const TxnSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  from: { type: String, set: (v: Address) => v.toString() }, // index?
  to: { type: String, set: (v: Address) => v.toString() }, // index?
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
