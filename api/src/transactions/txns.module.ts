import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TransactionsController } from './txns.controller'
import { TransactionsService } from './txns.service'
import { TransactionSchema } from './txn.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
