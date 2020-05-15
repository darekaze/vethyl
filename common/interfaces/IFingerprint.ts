import { Document } from 'mongoose'

export interface IFingerprint extends Document {
  readonly blockStart: number
  readonly blockEnd: number
  readonly fingerprint: string
  readonly cumulativeFingerprint: string
  readonly transactionHash: string
}
