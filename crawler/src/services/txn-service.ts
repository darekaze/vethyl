import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { TransactionResponse } from 'web3x/formatters'
import { ITransaction, DbTransaction } from '../@types/ITransaction'

@Service()
export class TxnService {
  constructor(
    @Inject('TxnModel') private TxnModel: Models.TxnModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async insertBlockTxns(
    transactions: TransactionResponse[],
    timestamp: number,
  ): Promise<ITransaction[]> {
    // skipping empty transaction list
    if (transactions.length < 1) return null

    try {
      this.logger.trace('Add doneBy prop to every transaction')
      const txns = transactions.map(
        txn => <DbTransaction>{ ...txn, doneAt: timestamp * 1000 },
      )

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
