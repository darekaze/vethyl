import mongoose from 'mongoose'
import { Db } from 'mongodb'
import config from '../config'

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.dbURL, { useNewUrlParser: true, useCreateIndex: true })
  return connection.connection.db
}
