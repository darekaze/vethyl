import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TransactionSchema } from '@vethyl/common'
import { TransactionsController } from './txns.controller'
import { TransactionsService } from './txns.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
