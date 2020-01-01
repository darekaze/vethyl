import { WebsocketProvider } from 'web3x/providers'
import { Eth } from 'web3x/eth'
import config from '../config'

export default async (): Promise<Eth> => {
  const provider = new WebsocketProvider(config.web3Url)
  const eth = new Eth(provider)
  return eth
}
