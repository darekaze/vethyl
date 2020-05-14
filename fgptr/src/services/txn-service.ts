import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { ITransaction } from '@vethyl/common'

@Service()
export class TxnService {
  constructor(
    @Inject('TxnModel') private txnModel: Models.TxnModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async getBlockTxns(start: number, end: number): Promise<ITransaction[]> {
    try {
      this.logger.trace('Fetching block transactions from %d to %d', start, end)
      const txnRecords = await this.txnModel
        .find({ blockNumber: { $gte: start, $lte: end } })
        .select('-_id -_v')
        .exec()

      if (!txnRecords) {
        throw new Error('Error in fetching transactions ')
      }

      return txnRecords
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
