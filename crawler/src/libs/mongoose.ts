import mongoose from 'mongoose'
import { Db } from 'mongodb'
import config from '../config'

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  return connection.connection.db
}
