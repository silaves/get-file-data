import expressWinston from 'express-winston'
import { logger } from '../../logger/index.js'

export const requestLogger = expressWinston.logger({
  winstonInstance: logger
})

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger
})
