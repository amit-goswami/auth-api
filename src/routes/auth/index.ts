import { Router } from 'express'

export class AppAuthRoutes {
  public route = Router()

  constructor() {}

  public getRoutes() {
    return this.route
  }
}

export const AuthRoutes = new AppAuthRoutes()
