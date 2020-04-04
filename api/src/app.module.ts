import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

// Self modules
import { BlocksModule } from './blocks/blocks.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
    }),
    BlocksModule,
  ],
})
export class AppModule {}
