import { createTypedHooks } from 'easy-peasy'
import { StoreModel } from './model'

const typedHooks = createTypedHooks<StoreModel>()

// export hooks with type information
export const { useStoreActions, useStoreDispatch, useStoreState } = typedHooks
