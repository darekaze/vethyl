import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { ITransaction, DbTransaction } from 'src/@types'

@Service()
export class TxnService {
  constructor(
    @Inject('TxnModel') private TxnModel: Models.TxnModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async insertBlockTxns(txns: DbTransaction[]): Promise<ITransaction[]> {
    // skipping empty transaction list
    if (txns.length < 1) return null

    try {
      this.logger.trace('Inserting block transactions to db')
      const txnRecords = await this.TxnModel.create(txns)

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
