import { Container } from 'typedi'
import { Eth } from 'web3x/eth'
import LoggerInstance from './logger'

export default async (web3Instance: Eth, models: { name: string; model: any }[]) => {
  try {
    // Inject models
    models.forEach(m => {
      Container.set(m.name, m.model)
    })
    // Inject other instance
    Container.set('logger', LoggerInstance)
    Container.set('web3', web3Instance)
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e)
    throw e
  }
}
