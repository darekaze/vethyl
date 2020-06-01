import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FingerprintSchema } from '@vethyl/common'
import { FingerprintService } from './fingerprint.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fingerprint', schema: FingerprintSchema }]),
  ],
  providers: [FingerprintService],
  exports: [FingerprintService],
})
export class FingerprintModule {}
