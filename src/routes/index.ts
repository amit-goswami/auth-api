import { Router } from 'express'
import { AppRouter } from './routes.interface'
import { UserRoutes } from './user'
import { AuthRoutes } from './auth'

class AppRoute implements AppRouter.IAppRoute {
  private route = Router()

  constructor() {
    this.healthCheck()
    this.authRoutes()
    this.userRoutes()
  }

  private authRoutes() {
    this.route.use(AuthRoutes.getRoutes())
  }

  private userRoutes() {
    this.route.use(UserRoutes.getRoutes())
  }

  private healthCheck() {
    this.route.get(AppRouter.ROUTES.DEFAULT, (_req, res) => {
      res.send(AppRouter.SERVER_STATUS.UP)
    })
  }

  public getRoutes() {
    return this.route
  }
}

export const Routes = new AppRoute()
