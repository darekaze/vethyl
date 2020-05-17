import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { IBlock } from '@vethyl/common'

@Injectable()
export class BlocksService {
  constructor(@InjectModel('Block') private readonly blockModel: Model<IBlock>) {}

  async findOneByNumber(number: number): Promise<IBlock> {
    return this.blockModel.findOne({ number }).select('-_id -__v').exec()
  }

  async findOneByHash(hash: string): Promise<IBlock> {
    return this.blockModel.findOne({ hash }).select('-_id -__v').exec()
  }
}
