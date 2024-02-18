import mongoose from 'mongoose'
import { config } from 'dotenv'
import { Connect } from './connect-db.interface'

class AppConnect implements Connect.DBConnectionConfig {
  private url: string

  constructor() {
    config()
    this.url = process.env.MONGODB_URL || Connect.DB_URL.DEFAULT
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.url)
      console.log(Connect.DB_STATUS.UP)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: Error): void {
    console.error(Connect.DB_STATUS.DOWN, error)
    process.exit(1)
  }
}

export const MongoDBCApponnection = new AppConnect()
