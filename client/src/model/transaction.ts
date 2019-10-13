import { action, Action } from 'easy-peasy'

export interface TransactionModel {
  type: string
  payload: object | null
}

const transaction: TransactionModel = {
  type: '',
  payload: null,
}

export default transaction
