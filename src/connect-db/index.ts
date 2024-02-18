import mongoose from 'mongoose'
import { config } from 'dotenv'
import { ConnectType } from './connect-db.interface'
import { Logger } from '../logger'

class AppConnect implements ConnectType.DBConnectionConfig {
  private url: string

  constructor() {
    config()
    this.url = process.env.MONGODB_URL || ConnectType.DB_URL.DEFAULT
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url)
      Logger.log(ConnectType.DB_STATUS.UP)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error): void {
    Logger.error(ConnectType.DB_STATUS.DOWN, error)
    process.exit(1)
  }
}

export const Connect = new AppConnect()
