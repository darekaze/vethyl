import { RequestHandler } from 'micro'
import microCors from 'micro-cors'
import { WebsocketProvider } from 'web3x/providers'
import { Eth } from 'web3x/eth'
import { bufferToHex } from 'web3x/utils'

// Split the loader somewhere else
const BLOCK_START = parseInt(process.env.BLOCK_START, 10)
console.log(`Starting from: ${BLOCK_START}`)

async function main() {
  const provider = new WebsocketProvider('wss://mainnet.infura.io/ws')
  const eth = new Eth(provider)
  // const tx = await eth.getTransaction(
  //   '0xf517872f3c466c2e1520e35ad943d833fdca5a6739cfea9e686c4c1b3ab1022e'
  // )
  const block = await eth.getBlock(BLOCK_START)

  console.dir(bufferToHex(block.nonce))
}

main()

// Setup health check point
const cors = microCors({ allowMethods: ['GET', 'POST'] })
const root: RequestHandler = () => ({
  statusCode: 200,
  status: 'OK',
})
export default cors(root)
