import dayjs from 'dayjs'
import logger, { Logger as LoggerType } from 'pino'
import { AppLogger } from './logger.interface'

class AppLog implements AppLogger.Logger {
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

  public error(message: string): void {
    this.logger.error(`${message}`)
  }

  public warn(message: string): void {
    this.logger.warn(`${message}`)
  }
}

export const Logger = new AppLog()
