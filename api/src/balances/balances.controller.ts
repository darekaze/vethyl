import { Controller, Get, Param, Query } from '@nestjs/common'
import { IBalanceState, IBalanceRecord } from '@vethyl/common'
import { BalancesService } from './balances.service'
import { RecordByDateDto } from './dto'

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get(':addr')
  async getLatestBalance(@Param() params: { addr: string }): Promise<IBalanceState> {
    return this.balancesService.findOneStateByAddress(params.addr)
  }

  @Get('record')
  async getBalanceRecord(
    @Query() query: RecordByDateDto,
  ): Promise<IBalanceRecord[]> {
    return this.balancesService.findRecordByDate(query)
  }
}
