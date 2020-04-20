// Helpers

export type BalanceInfo = {
  balance: number
}

export type AddressList = {
  [address: string]: BalanceInfo
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
