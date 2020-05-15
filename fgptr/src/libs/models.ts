import { model } from 'mongoose'
import {
  IBlock,
  ITransaction,
  IFingerprint,
  BlockSchema,
  TransactionSchema,
  FingerprintSchema,
} from '@vethyl/common'

export default [
  {
    name: 'BlockModel',
    model: model<IBlock>('Block', BlockSchema),
  },
  {
    name: 'TxnModel',
    model: model<ITransaction>('Transaction', TransactionSchema),
  },
  {
    name: 'FingerprintModel',
    model: model<IFingerprint>('Fingerprint', FingerprintSchema),
  },
]
