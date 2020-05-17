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

export interface BlockModel extends BlockBody {
  setResponse: Action<BlockModel, BlockBody>
  fetchBlock: Thunk<BlockModel, BlockQuery>
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
      const { query } = payload
      let endpoint = `/blocks/${query}`
      if (query.includes('0x')) {
        endpoint = `/blocks/hash/${query}`
      }

      const { data }: ApiResponse<object> = await api.get(endpoint)
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
