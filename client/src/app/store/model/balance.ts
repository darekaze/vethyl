// This use immer under the hood, so we allow param-reassign
/* eslint-disable no-param-reassign */

import { action, Action, thunk, Thunk } from 'easy-peasy'
import { ApiResponse } from 'apisauce'
import api from 'services'

export interface BalanceBody {
  status: string
  payload: any
}

export interface BalanceQuery {
  addr: string
  start: string
  end?: string
}

export interface BalanceModel extends BalanceBody {
  setResponse: Action<BalanceModel, BalanceBody>
  fetchBalanceRecords: Thunk<BalanceModel, BalanceQuery>
  fetchAccountBalance: Thunk<BalanceModel, string>
}

const balance: BalanceModel = {
  status: '',
  payload: [],
  setResponse: action((state, data) => {
    state.status = data.status
    state.payload = data.payload
  }),
  fetchBalanceRecords: thunk(async (actions, query) => {
    try {
      const { data }: ApiResponse<object[]> = await api.get(
        '/balances/record',
        query,
      )
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
  fetchAccountBalance: thunk(async (actions, addr) => {
    try {
      const { data }: ApiResponse<object> = await api.get(`/balances/${addr}`)
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

export default balance
