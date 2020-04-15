import mongoose from 'mongoose'
import { ITransaction } from 'src/@types/ITransaction'
import { Address } from 'web3x/address'

const TxnSchema = new mongoose.Schema({
  hash: { type: String, unique: true, index: true },
  blockHash: { type: String, index: true },
  blockNumber: { type: Number, index: true },
  doneAt: { type: Date, index: true },
  from: { type: String, index: true, set: (v: Address) => v.toString() },
  to: { type: String, index: true, set: (v: Address) => (v ? v.toString() : null) },
  value: String,
  gas: Number,
  gasPrice: Number,
  gasUsed: Number, // from receipts
  nonce: Number,
  transactionIndex: Number,
  input: String,
  status: Boolean, // from receipts
  contractAddr: String, // from receipts
})

export default mongoose.model<ITransaction>('Transaction', TxnSchema)
