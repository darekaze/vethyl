import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import config from '../config'

@Service()
export class BlockService {
  constructor(
    @Inject('BlockModel') private blockModel: Models.BlockModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async getBlockNumber(): Promise<number> {
    try {
      this.logger.trace('Get latest block number from db')
      const latestBlock = await this.blockModel.findOne().sort('-number').exec()

      if (!latestBlock) {
        this.logger.warn(
          'Block collection is empty, going to start from %d',
          config.blockStart,
        )
        return config.blockStart - 1
      }

      return latestBlock.number
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}