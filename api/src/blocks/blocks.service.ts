import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Block } from './block.interface'

@Injectable()
export class BlocksService {
  constructor(@InjectModel('Block') private readonly blockModel: Model<Block>) {}

  async findOneByNumber(number: number): Promise<Block> {
    return this.blockModel.findOne({ number }).exec()
  }

  async findOneByHash(hash: string): Promise<Block> {
    return this.blockModel.findOne({ hash }).exec()
  }
}
