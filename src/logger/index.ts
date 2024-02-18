import dayjs from 'dayjs'
import logger, { Logger as LoggerType } from 'pino'
import { AppLoggerType } from './logger.interface'
import { Error } from 'mongoose'

class AppLogger implements AppLoggerType.Logger {
  private logger: LoggerType

  constructor() {
    this.logger = logger({
      transport: {
        target: 'pino-pretty'
      },
      level: 'info',
      base: {
        pid: false
      },
      timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`
    })
  }

  public log(message: string): void {
    this.logger.info(`${message}`)
  }

  public error(message: string, error: Error): void {
    this.logger.error(`${message} ${error}`)
  }

  public warn(message: string): void {
    this.logger.warn(`${message}`)
  }
}

export const Logger = new AppLogger()
