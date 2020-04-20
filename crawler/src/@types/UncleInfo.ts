import { Address } from 'web3x/address'

export type UncleInfo = {
  hash: string
  number: number
  miner: Address
}

// export type UncleInfoWithGetUncle = {
//   uncleHeight: number
//   unclePosition: number
//   blockHeight: number
//   miner: Address
// }
