/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose'
import { IBlock, ITransaction, IFingerprint } from '@vethyl/common'

// globals
declare global {
  namespace Models {
    export type BlockModel = Model<IBlock>
    export type TxnModel = Model<ITransaction>
    export type FingerprintModel = Model<IFingerprint>
  }
}
