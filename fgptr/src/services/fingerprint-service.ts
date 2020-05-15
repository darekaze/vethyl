import { Service, Inject } from 'typedi'
import { Logger } from 'pino'
import { IFingerprint } from '@vethyl/common'
import { CreateFingerprintDTO } from '../@types'
import config from '../config'

@Service()
export class FingerprintService {
  constructor(
    @Inject('FingerprintModel') private fpModel: Models.FingerprintModel,
    @Inject('logger') private logger: Logger,
  ) {}

  public async insertFingerprint(fp: CreateFingerprintDTO): Promise<IFingerprint> {
    try {
      this.logger.trace('Register new fingerprint')
      const fpRecord = await this.fpModel.create(fp)

      if (!fpRecord) {
        throw new Error('Error in register Fingerprint')
      }

      return fpRecord
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async getLastestFpInfo() {
    try {
      this.logger.trace('Get latest fingerprint from db')
      const latestFp = await this.fpModel.findOne().sort('-blockEnd').exec()

      if (!latestFp) {
        this.logger.warn(
          'Fingerprint collection is empty, going to start from block %d',
          config.blockStart,
        )

        return {
          latestNum: config.blockStart - 1,
          cumulativeFingerprint: '',
        }
      }

      return {
        latestNum: latestFp.blockEnd,
        cumulativeFingerprint: latestFp.cumulativeFingerprint,
      }
    } catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}
