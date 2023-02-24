import { createLogger, format, transports } from 'winston'

const consoleTransport = new transports.Console({
  level: process.env.LOG_LEVEL
})

const logLineFormat = format.printf(({ level, message, timestamp }) => {
  return `@timestamp=${timestamp} level=${level} message="${message}"`
})

export const logger = createLogger({
  transports: [consoleTransport],
  format: format.combine(format.timestamp(), logLineFormat)
})
