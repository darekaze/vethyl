import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import dayjs from 'dayjs'
import { Transaction } from './txn.interface'
import { TxnsByDateDto } from './dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly txnModel: Model<Transaction>,
  ) {}

  async findOneByHash(hash: string): Promise<Transaction> {
    return this.txnModel.findOne({ hash }).exec()
  }

  async findByDate(query: TxnsByDateDto): Promise<Transaction[]> {
    const start = dayjs(query.start, { utc: true })
    const end = dayjs(query.end || query.start, { utc: true }).add(1, 'day')

    return this.txnModel
      .find({
        from: query.addr,
        doneAt: {
          $gte: start.toDate(),
          $lt: end.toDate(),
        },
      })
      .sort({ doneAt: -1 })
      .exec()
  }
}
