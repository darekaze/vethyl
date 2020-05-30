import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import dayjs from 'dayjs'
import { IBalanceState, IBalanceRecord } from '@vethyl/common'
import { RecordByDateDto } from './dto'

@Injectable()
export class BalancesService {
  constructor(
    @InjectModel('BalanceState')
    private readonly balanceStateModel: Model<IBalanceState>,
    @InjectModel('BalanceRecord')
    private readonly balanceRecordModel: Model<IBalanceRecord>,
  ) {}

  async findOneStateByAddress(address: string): Promise<IBalanceState> {
    return this.balanceStateModel.findOne({ address }).select('-_id -__v').exec()
  }

  async findRecordByDate(query: RecordByDateDto): Promise<IBalanceRecord[]> {
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
      .select('-_id -__v')
      .exec()
  }
}
