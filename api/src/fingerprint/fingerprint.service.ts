import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IFingerprint } from '@vethyl/common'
import { FpsByBlockRangeDto } from './dto'

@Injectable()
export class FingerprintService {
  constructor(
    @InjectModel('Fingerprint') private readonly fpModel: Model<IFingerprint>,
  ) {}

  async findLatest(): Promise<IFingerprint> {
    return this.fpModel.findOne().sort('-blockEnd').exec()
  }

  async findOneByNumber(blockNum: number): Promise<IFingerprint> {
    return this.fpModel
      .findOne({ blockStart: { $lte: blockNum }, blockEnd: { $gte: blockNum } })
      .select('-_id -__v')
      .exec()
  }

  async findByBlockRange({
    start,
    end = start,
  }: FpsByBlockRangeDto): Promise<IFingerprint[]> {
    if (start === end) {
      return [await this.findOneByNumber(start)]
    }

    // eslint-disable-next-line prefer-const
    let [firstFp, lastFp] = await Promise.all([
      this.findOneByNumber(start),
      this.findOneByNumber(end),
    ])

    if (!firstFp) {
      return null
    }
    if (!lastFp) {
      lastFp = await this.findLatest()
    }

    return this.fpModel
      .find({
        blockStart: { $gte: firstFp.blockStart, $lte: lastFp.blockStart },
      })
      .select('-_id -__v')
      .exec()
  }
}
