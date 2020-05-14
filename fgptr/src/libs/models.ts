import { model } from 'mongoose'
import { IBlock, ITransaction, BlockSchema, TransactionSchema } from '@vethyl/common'

export default [
  {
    name: 'BlockModel',
    model: model<IBlock>('Block', BlockSchema),
  },
  {
    name: 'TxnModel',
    model: model<ITransaction>('Transaction', TransactionSchema),
  },
  // TODO: add fingerprint model here
  // Ignore balance first
  // {
  //   name: 'BalanceStateModel',
  //   model: model<IBalanceState>('BalanceState', BalanceStateSchema),
  // },
  // {
  //   name: 'BalanceRecordModel',
  //   model: model<IBalanceRecord>('BalanceRecord', BalanceRecordSchema),
  // },
]
