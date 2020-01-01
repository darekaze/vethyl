import microCors from 'micro-cors'

// Setup cors
const cors = microCors({ allowMethods: ['GET'] })

// Load other stuffs
require('./libs').default()

// Expose health check point
export default cors(async () => ({ status: 'pass' }))
