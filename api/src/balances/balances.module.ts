import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BalancesController } from './balances.controller'
import { BalancesService } from './balances.service'
import { BalanceStateSchema, BalanceRecordSchema } from './schemas'

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
