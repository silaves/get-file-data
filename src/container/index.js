import { createContainer, InjectionMode } from 'awilix'
import { registerEnvironment } from './environment.js'
import { registerRestApi } from './api.js'
import { registerUtils } from './utlis.js'

export const configureContainer = () => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY
  })

  registerEnvironment(container)
  registerUtils(container)
  registerRestApi(container)

  return container
}
