import { Controller, Get, Param } from '@nestjs/common'
import { IBlock } from '@vethyl/common'
import { BlocksService } from './blocks.service'

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get(':num')
  async getBlockByNumber(@Param() params: { num: number }): Promise<IBlock> {
    return this.blocksService.findOneByNumber(params.num)
  }

  @Get('hash/:hash')
  async getBlockByHash(@Param() params: { hash: string }): Promise<IBlock> {
    return this.blocksService.findOneByHash(params.hash)
  }
}
