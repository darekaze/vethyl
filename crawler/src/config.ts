import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// This error should crash whole process
const envFound = dotenv.config()
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
  web3Url: process.env.WEB3_URL || 'wss://mainnet.infura.io/ws',
  dbURL: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  dbStage: process.env.DB_STAGE || 'dev',
  jwtSecret: process.env.JWT_SECRET || 'waahaha',
}
