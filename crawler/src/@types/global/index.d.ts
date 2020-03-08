/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose'
import { IBlock } from '../IBlock'
import { ITransaction } from '../ITransaction'

// globals
declare global {
  namespace Models {
    export type BlockModel = Model<IBlock>
    export type TxnModel = Model<ITransaction>
  }
}
