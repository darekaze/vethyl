export type FingerprintSignature = {
  blockStart: number
  blockEnd: number
  fingerprint: string
  cumulativeFingerprint: string
}

export type CreateFingerprintDTO = FingerprintSignature & {
  transactionHash: string
}
