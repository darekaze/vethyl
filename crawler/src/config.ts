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
  web3Url: process.env.WEB3_URL,
  dbUrl: process.env.DB_URL,
  syncInterval: ms(process.env.SYNC_INTERVAL || '15s'),
  blockStart: parseInt(process.env.BLOCK_START || '0', 10),
}
