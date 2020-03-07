/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose'
import { IBlock } from './IBlock'
import { ITransaction } from './ITransaction'

// If 3rd party modules doesn't have typings, add here to ignore them
declare module 'micro-cors'

// globals
declare global {
  namespace Models {
    export type BlockModel = Model<IBlock>
    export type TxnModel = Model<ITransaction>
  }
}
