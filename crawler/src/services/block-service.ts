import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { DbBlock, IBlock } from '../@types/IBlock'

@Service()
export class BlockService {
  constructor(
    @Inject('BlockModel') private blockModel: Models.BlockModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async insertBlock(block: DbBlock): Promise<IBlock> {
    try {
      this.logger.silly('Creating block db record')
      const blockRecord = await this.blockModel.create(block)

      if (!blockRecord) {
        throw new Error('Block cannot be created')
      }

      return blockRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
