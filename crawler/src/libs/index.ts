/* eslint-disable global-require */
import mongooseLoader from './mongoose'
import web3Loader from './web3'
import depInjectorLoader from './depInjector'
import initCrawler from '../core/crawler'
import Logger from './logger'

export default async () => {
  await mongooseLoader()
  Logger.info('✌️ DB loaded and connected!')

  const web3Connection = await web3Loader()
  Logger.info('✌️ Web3 loaded and connected!')

  // Inject mongoose models
  const models = require('./models').default

  await depInjectorLoader(web3Connection, models)
  Logger.info('✌️ Dependency Injector loaded')

  await initCrawler()
  Logger.info('🌶️  Crawler loaded')
}
