import mongoose from 'mongoose'
import config from '../config'

export default async () => {
  const connection = await mongoose.connect(config.dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
  })
  return connection.connection.db
}
