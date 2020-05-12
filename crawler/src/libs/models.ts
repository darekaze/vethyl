import { model } from 'mongoose'
import {
  IBlock,
  ITransaction,
  IBalanceState,
  IBalanceRecord,
  BlockSchema,
  TransactionSchema,
  BalanceStateSchema,
  BalanceRecordSchema,
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
    name: 'BalanceStateModel',
    model: model<IBalanceState>('BalanceState', BalanceStateSchema),
  },
  {
    name: 'BalanceRecordModel',
    model: model<IBalanceRecord>('BalanceRecord', BalanceRecordSchema),
  },
]
