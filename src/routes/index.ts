import { Router } from 'express'
import { AppRouterType } from './routes.interface'
import { UserRoutes } from './user'
import { AuthRoutes } from './auth'

class AppRoute implements AppRouterType.IAppRoute {
  private route = Router()

  constructor() {
    this.healthCheck()
    this.authRoutes()
    this.userRoutes()
  }

  private authRoutes() {
    this.route.use(AppRouterType.ROUTES.BASE, AuthRoutes.getRoutes())
  }

  private userRoutes() {
    this.route.use(AppRouterType.ROUTES.BASE, UserRoutes.getRoutes())
  }

  private healthCheck() {
    this.route.get(AppRouterType.ROUTES.DEFAULT, (_req, res) => {
      res.send(AppRouterType.SERVER_STATUS.UP)
    })
  }

  public getRoutes() {
    return this.route
  }
}

export const Route = new AppRoute()
