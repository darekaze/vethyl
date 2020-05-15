import dotenv from 'dotenv'
import { validate } from 'node-cron'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// This error should crash whole process
const envFound = dotenv.config()
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

// Cronjob run at specific hour
const cronSchedule = process.env.CRON_SCHEDULE || '00 2,8,14,20 * * *'
if (!validate(cronSchedule)) {
  throw new Error('⚠️  Cron format error!  ⚠️')
}

export default {
  web3Url: process.env.WEB3_URL,
  dbUrl: process.env.DB_URL,
  blockInterval: parseInt(process.env.BLOCK_INTERVAL || '1000', 10),
  blockStart: parseInt(process.env.BLOCK_START || '0', 10),
  cronSchedule,
}
