// This use immer under the hood, so we allow param-reassign
/* eslint-disable no-param-reassign */

import { action, Action, thunk, Thunk } from 'easy-peasy'
import { ApiResponse } from 'apisauce'
import api from 'services'

export interface BlockBody {
  status: string
  payload: any
}

export interface BlockQuery {
  query: string
}

export interface RangeBlockQuery {
  start: number
  end: number
}

export interface BlockModel extends BlockBody {
  setResponse: Action<BlockModel, BlockBody>
  fetchBlock: Thunk<BlockModel, BlockQuery>
  fetchRangeBlocks: Thunk<BlockModel, RangeBlockQuery>
}

const block: BlockModel = {
  status: '',
  payload: null,
  setResponse: action((state, data) => {
    state.status = data.status
    state.payload = data.payload
  }),
  fetchBlock: thunk(async (actions, payload) => {
    if (!payload.query) return

    try {
      const { data }: ApiResponse<object> = await api.get(`/blocks/${payload.query}`)
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
  fetchRangeBlocks: thunk(async (actions, payload) => {
    if (!payload.start || !payload.end) return

    try {
      const { data }: ApiResponse<object> = await api.get('/blocks/range', payload)
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

export default block
