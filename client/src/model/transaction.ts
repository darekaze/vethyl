// This use immer under the hood, so we allow param-reassign
/* eslint-disable no-param-reassign */

import { action, Action, thunk, Thunk } from 'easy-peasy'
import api from '../services'

export interface TransactionBody {
  status: string
  payload: object | null
}

export interface TransactionModel extends TransactionBody {
  setResponse: Action<TransactionModel, TransactionBody>
  updatePayload: Thunk<TransactionModel, TransactionBody>
}

const transaction: TransactionModel = {
  status: '',
  payload: null,
  setResponse: action((state, data) => {
    state.status = data.status
    state.payload = data.payload
  }),
  updatePayload: thunk(async (actions, reqBody) => {
    try {
      const { data } = await api.post('/transaction', reqBody)
      actions.updatePayload({
        status: 'SUCCESS',
        payload: data,
      })
    } catch (err) {
      actions.updatePayload({
        status: 'ERROR',
        payload: err.response.data,
      })
    }
  }),
}

export default transaction
