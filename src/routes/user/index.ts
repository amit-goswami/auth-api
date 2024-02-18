import { Router } from 'express'
import { AppUserRoutesType } from './user-route.interface'

export class AppUserRoutes implements AppUserRoutesType.IUserRoute {
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
    this.route.post(AppUserRoutesType.ROUTES.USERS, (_req, res) => {
      res.send('User created')
    })
  }

  public getRoutes() {
    return this.route
  }
}

export const UserRoutes = new AppUserRoutes()
