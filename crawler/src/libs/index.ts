import Logger from './logger'
import web3Loader from './web3'
import initCrawler from './crawler'
// import mongooseLoader from './mongoose'

export default async () => {
  // const mongoConnection = await mongooseLoader()
  const web3Connection = await web3Loader()

  await initCrawler(web3Connection)
  Logger.info('🌶️  Crawler loaded')
}
