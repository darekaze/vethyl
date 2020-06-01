import { Controller, Get, Param, Query } from '@nestjs/common'
import { ITransaction, IFingerprint } from '@vethyl/common'
import { TransactionsService } from './txns.service'
import { FingerprintService } from '../fingerprint/fingerprint.service'
import { TxnsByDateDto } from './dto'

interface TxnsWithFp {
  data: ITransaction | ITransaction[]
  fingerprint: IFingerprint | IFingerprint[]
}

@Controller('txns')
export class TransactionsController {
  constructor(
    private readonly txnsService: TransactionsService,
    private readonly fpService: FingerprintService,
  ) {}

  @Get(':hash')
  async getTransaction(@Param() params: { hash: string }): Promise<TxnsWithFp> {
    const data = await this.txnsService.findOneByHash(params.hash)
    const fingerprint = await this.fpService.findOneByNumber(data.blockNumber)

    return { fingerprint, data }
  }

  @Get('date')
  async getTransactionsByDate(@Query() query: TxnsByDateDto): Promise<TxnsWithFp> {
    const data = await this.txnsService.findByDate(query)

    const last = data.length - 1
    const fingerprint = await this.fpService.findByBlockRange({
      start: data[last].blockNumber,
      end: data[0].blockNumber,
    })

    return { fingerprint, data }
  }
}
