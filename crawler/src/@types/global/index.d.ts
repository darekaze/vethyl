/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose'
import { IBlock, ITransaction, IBalanceState, IBalanceRecord } from '..'

// globals
declare global {
  namespace Models {
    export type BlockModel = Model<IBlock>
    export type TxnModel = Model<ITransaction>
    export type BalanceStateModel = Model<IBalanceState>
    export type BalanceRecordModel = Model<IBalanceRecord>
  }
}
