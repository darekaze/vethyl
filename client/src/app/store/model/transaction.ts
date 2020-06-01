// This use immer under the hood, so we allow param-reassign
/* eslint-disable no-param-reassign */

import { action, Action, thunk, Thunk } from 'easy-peasy'
import { ApiResponse } from 'apisauce'
import api from 'services'

export interface TransactionBody {
  status: string
  payload: any
}

export interface TransactionQuery {
  start: string
  end?: string
  fromAddr?: string
  toAddr?: string
}

export interface TransactionModel extends TransactionBody {
  setResponse: Action<TransactionModel, TransactionBody>
  fetchTransactions: Thunk<TransactionModel, TransactionQuery>
}

const transaction: TransactionModel = {
  status: '',
  payload: [],
  setResponse: action((state, data) => {
    state.status = data.status
    state.payload = data.payload
  }),
  fetchTransactions: thunk(async (actions, query) => {
    try {
      const { data }: ApiResponse<object> = await api.get('/txns/date', query)
      actions.setResponse({
        status: 'SUCCESS',
        payload: data,
      })
    } catch (err) {
      actions.setResponse({
        status: 'ERROR',
        payload: err,
      })
    }
  }),
}

export default transaction
