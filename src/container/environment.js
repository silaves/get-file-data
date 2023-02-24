import { asValue } from 'awilix'
import dotenv from 'dotenv'

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

const {
  SERVER_PORT,
  LOG_LEVEL,
  API_PREFIX,
  NODE_ENV,
  HOST_APP_FILE_DATA,
  LIGHTSHIP_PORT,
  API_SECRET_FILES_LIST,
  API_SECRET_FILE,
  HOST_SECRET_FILE,
  TOKEN_SECRET_FILE,
  TYPE_AUTH_SECRET_FILE
} = process.env

export const registerEnvironment = (container) => {
  container.register({
    appConfig: asValue({
      serverPort: parseInt(SERVER_PORT),
      logLevel: LOG_LEVEL,
      apiPrefix: API_PREFIX,
      nodeEnv: NODE_ENV,
      hostAppFileData: HOST_APP_FILE_DATA,
      lightshipConfiguration: {
        port: parseInt(LIGHTSHIP_PORT),
        detectKubernetes: false
      },
      secretFile: {
        host: HOST_SECRET_FILE,
        token: TOKEN_SECRET_FILE,
        typeAuth: TYPE_AUTH_SECRET_FILE,
        apiFilesList: API_SECRET_FILES_LIST,
        apiFile: API_SECRET_FILE
      }
    })
  })
}
