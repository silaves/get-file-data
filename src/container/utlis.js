import { asFunction } from 'awilix'
import { secretFileConnection } from '../utils/secretFileConnection.js'

export const registerUtils = (container) => {
  container.register({
    secretFileConnection: asFunction(secretFileConnection).singleton()
  })
}
