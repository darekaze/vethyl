import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { ITransaction } from '@vethyl/common'
import { DbTransaction } from 'src/@types'

@Service()
export class TxnService {
  constructor(
    @Inject('TxnModel') private txnModel: Models.TxnModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async insertBlockTxns(txns: DbTransaction[]): Promise<ITransaction[]> {
    try {
      // skipping empty transaction list
      if (txns.length < 1) return null

      this.logger.trace('Inserting block transactions to db')
      const txnRecords = await this.txnModel.create(txns)

      if (!txnRecords) {
        throw new Error('Transactions cannot be added')
      }

      return txnRecords
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
