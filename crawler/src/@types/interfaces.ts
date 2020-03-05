export type DbBlock = {
  number: number | null
  hash: string | null
  parentHash: string
  nonce: string | null
  sha3Uncles: string
  logsBloom: string | null
  transactionsRoot: string
  stateRoot: string
  receiptsRoot: string
  miner: string
  difficulty: string // BigInt
  totalDifficulty: string // BigInt
  extraData: string // Can be decode to string
  size: number
  gasLimit: number
  gasUsed: number
  timestamp: number
  transactions: string[]
  uncles: string[]
}

export type DbTransaction = {
  blockHash: string | null
  blockNumber: number | null
  from: string
  gas: number
  gasPrice: number
  hash: string
  input: string
  nonce: number
  to: string | null
  transactionIndex: number | null
  value: string
  v: string
  r: string
  s: string
}
