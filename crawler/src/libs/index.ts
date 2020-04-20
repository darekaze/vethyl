/* eslint-disable global-require */
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

  // Inject mongoose models
  const models: any[] = [
    {
      name: 'BlockModel',
      model: require('../models/block').default,
    },
    {
      name: 'TxnModel',
      model: require('../models/transaction').default,
    },
    {
      name: 'BalanceStateModel',
      model: require('../models/balance-state').default,
    },
    {
      name: 'BalanceRecordModel',
      model: require('../models/balance-record').default,
    },
  ]

  await depInjectorLoader(web3Connection, models)
  Logger.info('✌️ Dependency Injector loaded')

  await initCrawler()
  Logger.info('🌶️  Crawler loaded')
}
