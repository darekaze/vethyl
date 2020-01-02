import dotenv from 'dotenv'
import ms from 'ms'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// This error should crash whole process
const envFound = dotenv.config()
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
  web3Url: process.env.WEB3_URL || 'wss://mainnet.infura.io/ws',
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET || 'waahaha',
  syncInterval: ms(process.env.SYNC_INTERVAL || '15s'),
  blockStart: parseInt(process.env.BLOCK_START || '9190000', 10), // change to 0 after
}
