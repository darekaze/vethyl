import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import dayjs from 'dayjs'
import { ITransaction } from '@vethyl/common'
import { TxnsByDateDto } from './dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly txnModel: Model<ITransaction>,
  ) {}

  async findOneByHash(hash: string): Promise<ITransaction> {
    return this.txnModel.findOne({ hash }).exec()
  }

  async findByDate(query: TxnsByDateDto): Promise<ITransaction[]> {
    const start = dayjs(query.start, { utc: true })
    const end = dayjs(query.end || query.start, { utc: true }).add(1, 'day')

    const search: any = {
      doneAt: {
        $gte: start.toDate(),
        $lt: end.toDate(),
      },
    }

    if (query.fromAddr) {
      search.from = query.fromAddr
    }

    if (query.toAddr) {
      search.to = query.toAddr
    }

    return this.txnModel
      .find(search)
      .select('-_id -__v')
      .sort({ doneAt: -1 })
      .limit(100) // limit first
      .exec()
  }
}
