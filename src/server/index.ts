import dotenv from 'dotenv'
import express, { Application } from 'express'

class Server {
  public app: Application
  public port: string

  constructor() {
    dotenv.config()
    this.app = express()
    this.port = process.env.PORT || '8001'
  }

  public healthCheck() {
    this.app.get('/', (_req, res) => {
      res.send('Server is up and running')
    })
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server started at http://localhost:${this.port}`)
    })
  }
}

export const AppServer = new Server()
