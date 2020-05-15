import { Eth } from 'web3x/eth'
import { Container } from 'typedi'
import { createHash } from 'crypto'
import { BlockService, TxnService } from '../services'
import { FingerprintSignature, CreateFingerprintDTO } from '../@types'

export const genCurrentFP = async (start: number, end: number): Promise<string> => {
  const blockServiceInstance = Container.get(BlockService)
  const txnServiceInstance = Container.get(TxnService)
  const fingerprint = createHash('sha3-256')

  // Fetch blocks and transactions, generate hash by sha3-256 with json.stringify
  const [blocks, txns] = await Promise.all([
    blockServiceInstance.getBlocks(start, end),
    txnServiceInstance.getBlockTxns(start, end),
  ])
  fingerprint.update(JSON.stringify({ blocks, transactions: txns }))

  return fingerprint.digest('hex')
}

export const genCumulativeFP = (cumulativeFP: string, currentFP: string): string => {
  const fp = createHash('sha3-256')
  const concatHex = cumulativeFP.concat(currentFP)
  fp.update(concatHex)

  return fp.digest('hex')
}

export const signNewTxn = async (
  data: FingerprintSignature,
): Promise<CreateFingerprintDTO> => {
  const eth = Container.get<Eth>('web3')

  // TODO: sign transaction

  return { ...data, transactionHash: '' }
}
