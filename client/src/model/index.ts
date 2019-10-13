import transactionModel, { TransactionModel } from './transaction'

export interface StoreModel {
  transaction: TransactionModel
}

const storeModel = {
  transaction: transactionModel,
}

export default storeModel
