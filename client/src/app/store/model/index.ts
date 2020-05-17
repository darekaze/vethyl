import transactionModel, { TransactionModel } from './transaction'
import blockModel, { BlockModel } from './block'

export interface StoreModel {
  transaction: TransactionModel
  block: BlockModel
}

const storeModel = {
  transaction: transactionModel,
  block: blockModel,
}

export default storeModel
