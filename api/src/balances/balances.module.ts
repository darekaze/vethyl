import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BalanceStateSchema, BalanceRecordSchema } from '@vethyl/common'
import { BalancesController } from './balances.controller'
import { BalancesService } from './balances.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BalanceState', schema: BalanceStateSchema },
      { name: 'BalanceRecord', schema: BalanceRecordSchema },
    ]),
  ],
  controllers: [BalancesController],
  providers: [BalancesService],
})
export class BalancesModule {}
