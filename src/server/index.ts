import express, { Application } from 'express'
import { config } from 'dotenv'
import { App } from './server.interface'
import { MongoDBCApponnection } from '../connect-db'
import { Logger } from '../logger'

class Server implements App.IAppServer {
  public app: Application
  public port: string

  constructor() {
    config()
    this.app = express()
    this.port = process.env.PORT || App.PORT.DEFAULT
    this.healthCheck()
  }

  private healthCheck() {
    this.app.get(App.ROUTES.DEFAULT, (_req, res) => {
      res.send(App.SERVER_STATUS.UP)
    })
  }

  public start() {
    this.app.listen(this.port, () => {
      Logger.log(`Server started at http://localhost:${this.port}`)
    })
    MongoDBCApponnection.connect()
  }
}

export const AppServer = new Server()
