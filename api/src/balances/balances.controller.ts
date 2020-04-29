import { Controller, Get, Param, Query } from '@nestjs/common'
import { BalancesService } from './balances.service'
import { BalanceState, BalanceRecord } from './interfaces'
import { RecordByDateDto } from './dto'

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get(':addr')
  async getLatestBalance(@Param() params: { addr: string }): Promise<BalanceState> {
    return this.balancesService.findOneStateByAddress(params.addr)
  }

  @Get('record')
  async getBalanceRecord(@Query() query: RecordByDateDto): Promise<BalanceRecord[]> {
    return this.balancesService.findRecordByDate(query)
  }
}
