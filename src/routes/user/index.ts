import { Router } from 'express'

export class AppUserRoutes {
  public route = Router()

  constructor() {
    this.userGet()
    this.userPost()
  }

  private userGet() {
    this.route.get('/user', (_req, res) => {
      res.send('User get')
    })
  }

  private userPost() {
    this.route.post('/user', (_req, res) => {
      res.send('User created')
    })
  }

  public getRoutes() {
    return this.route
  }
}

export const UserRoutes = new AppUserRoutes()
