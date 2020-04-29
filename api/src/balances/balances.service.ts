import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import dayjs from 'dayjs'
import { BalanceState, BalanceRecord } from './interfaces'
import { RecordByDateDto } from './dto'

@Injectable()
export class BalancesService {
  constructor(
    @InjectModel('BalanceState')
    private readonly balanceStateModel: Model<BalanceState>,
    @InjectModel('BalanceRecord')
    private readonly balanceRecordModel: Model<BalanceRecord>,
  ) {}

  async findOneStateByAddress(address: string): Promise<BalanceState> {
    return this.balanceStateModel.findOne({ address }).exec()
  }

  async findRecordByDate(query: RecordByDateDto): Promise<BalanceRecord[]> {
    const start = dayjs(query.start, { utc: true })
    const end = dayjs(query.end || query.start, { utc: true }).add(1, 'day')

    // ENHANCE: Limit the range if possible
    return this.balanceRecordModel
      .find({
        address: query.addr,
        time: {
          $gte: start.toDate(),
          $lt: end.toDate(),
        },
      })
      .sort({ time: -1 })
      .exec()
  }
}
