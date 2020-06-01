import { Controller, Get, Param, Query } from '@nestjs/common'
import { IBlock, IFingerprint } from '@vethyl/common'
import { BlocksService } from './blocks.service'
import { FingerprintService } from '../fingerprint/fingerprint.service'

interface BlockWithFp {
  data: IBlock | IBlock[]
  fingerprint: IFingerprint | IFingerprint[]
}

@Controller('blocks')
export class BlocksController {
  constructor(
    private readonly blocksService: BlocksService,
    private readonly fpService: FingerprintService,
  ) {}

  @Get(':numhash')
  async getBlockByNumber(
    @Param() params: { numhash: string },
  ): Promise<BlockWithFp> {
    const data = params.numhash.includes('0x')
      ? await this.blocksService.findOneByHash(params.numhash)
      : await this.blocksService.findOneByNumber(parseInt(params.numhash, 10))

    const fingerprint = await this.fpService.findOneByNumber(data.number)

    return { fingerprint, data }
  }

  @Get('range')
  async getBlocksByRange(
    @Query() query: { start: string; end: string },
  ): Promise<BlockWithFp> {
    const start = parseInt(query.start, 10)
    const end = parseInt(query.end, 10)

    const data = await this.blocksService.findByRange(start, end)
    const fingerprint = await this.fpService.findByBlockRange({ start, end })

    return { fingerprint, data }
  }
}
