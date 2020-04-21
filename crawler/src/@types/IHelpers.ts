// Helpers
import Big from 'big.js'

export type BalanceInfo = {
  address: string
  income: Big
  expense: Big
  exchange: Big
}

export type ExchangeList = {
  [address: string]: Big[]
}

export type UncleInfo = {
  hash: string
  number: number
  miner: string
}

// export type UncleInfoWithGetUncle = {
//   uncleHeight: number
//   unclePosition: number
//   blockHeight: number
//   miner: Address
// }
