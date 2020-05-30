import transactionModel, { TransactionModel } from './transaction'
import blockModel, { BlockModel } from './block'
import balanceModel, { BalanceModel } from './balance'

export interface StoreModel {
  transaction: TransactionModel
  block: BlockModel
  balance: BalanceModel
}

const storeModel = {
  transaction: transactionModel,
  block: blockModel,
  balance: balanceModel,
}

export default storeModel
