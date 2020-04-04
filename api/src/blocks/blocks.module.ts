import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BlocksController } from './blocks.controller'
import { BlocksService } from './blocks.service'
import { BlockSchema } from './block.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }])],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
