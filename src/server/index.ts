import express, { Application } from 'express'
import { config } from 'dotenv'
import { App } from './server.interface'
import { MongoDBCApponnection } from '../connect-db'
import { Logger } from '../logger'
import { Routes } from '../routes'

class Server implements App.IAppServer {
  public app: Application
  public port: string

  constructor() {
    config()
    this.app = express()
    this.port = process.env.PORT || App.PORT.DEFAULT
  }

  private routesInit() {
    this.app.use(Routes.getRoutes())
  }

  private listen() {
    this.app.listen(this.port, () => {
      Logger.log(`Server started at http://localhost:${this.port}`)
    })
  }

  public start() {
    this.routesInit()
    this.listen()
    MongoDBCApponnection.connect()
  }
}

export const AppServer = new Server()
