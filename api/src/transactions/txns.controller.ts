import { Controller, Get, Param, Query } from '@nestjs/common'
import { TransactionsService } from './txns.service'
import { Transaction } from './txn.interface'
import { TxnsByDateDto } from './dto'

@Controller('txns')
export class TransactionsController {
  constructor(private readonly txnsService: TransactionsService) {}

  @Get(':hash')
  async getTransaction(@Param() params: { hash: string }): Promise<Transaction> {
    return this.txnsService.findOneByHash(params.hash)
  }

  @Get('date')
  async getTransactionsByDate(
    @Query() query: TxnsByDateDto,
  ): Promise<Transaction[]> {
    return this.txnsService.findByDate(query)
  }
}
