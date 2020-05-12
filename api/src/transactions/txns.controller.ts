import { Controller, Get, Param, Query } from '@nestjs/common'
import { ITransaction } from '@vethyl/common'
import { TransactionsService } from './txns.service'
import { TxnsByDateDto } from './dto'

@Controller('txns')
export class TransactionsController {
  constructor(private readonly txnsService: TransactionsService) {}

  @Get(':hash')
  async getTransaction(@Param() params: { hash: string }): Promise<ITransaction> {
    return this.txnsService.findOneByHash(params.hash)
  }

  @Get('date')
  async getTransactionsByDate(
    @Query() query: TxnsByDateDto,
  ): Promise<ITransaction[]> {
    return this.txnsService.findByDate(query)
  }
}
