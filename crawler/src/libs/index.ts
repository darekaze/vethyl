import Logger from './logger'
import web3Loader from './web3'
import initCrawler from './crawler'
import mongooseLoader from './mongoose'
import depInjectorLoader from './depInjector'

export default async () => {
  await mongooseLoader()
  Logger.info('✌️ DB loaded and connected!')

  const web3Connection = await web3Loader()
  Logger.info('✌️ Web3 loaded and connected!')

  // TODO: inject mongoose model here
  const models: any[] = []

  await depInjectorLoader(web3Connection, models)
  Logger.info('✌️ Dependency Injector loaded')

  await initCrawler()
  Logger.info('🌶️  Crawler loaded')
}
