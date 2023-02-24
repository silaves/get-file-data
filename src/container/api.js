import { asFunction, asClass } from 'awilix'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { GetFileController } from '../api/controllers/getFile.js'
import { SecretFileService } from '../services/secretFiles.js'
import { requestLogger, errorLogger } from '../api/middleware/requestLogger.js'
import { handleError, handleError404 } from '../api/middleware/handleError.js'

export function registerRestApi (container) {
  container.register({
    secretFileService: asClass(SecretFileService).singleton(),
    getFileController: asClass(GetFileController.bind(GetFileController)).singleton(),
    router: asFunction(({ getFileController }) => {
      const router = express.Router()
      router.use(express.json())
      router.get(
        '/files/data',
        getFileController.getFileData.bind(getFileController)
      )
      router.get(
        '/files/list',
        getFileController.getFileList.bind(getFileController)
      )
      return router
    }),
    express: asFunction(({ router, appConfig }) => {
      const app = express()
      app.use(helmet())
      app.use(cors({
        origin: appConfig.hostAppFileData
      }))
      app.use(requestLogger)
      app.use(errorLogger)
      app.use(appConfig.apiPrefix, router)
      app.use(handleError404)
      app.use(handleError)

      return app
    })
  })
}
