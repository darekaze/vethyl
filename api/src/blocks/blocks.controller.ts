import { Controller, Get, Param } from '@nestjs/common'
import { BlocksService } from './blocks.service'
import { Block } from './block.interface'

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get(':num')
  async findOneByNumber(@Param() params: { num: number }): Promise<Block> {
    return this.blocksService.findOneByNumber(params.num)
  }

  @Get('hash/:hash')
  async findOneByHash(@Param() params: { hash: string }): Promise<Block> {
    return this.blocksService.findOneByHash(params.hash)
  }
}
