import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BlockSchema } from '@vethyl/common'
import { BlocksController } from './blocks.controller'
import { BlocksService } from './blocks.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }])],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
