import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'

class UserController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public getAllUsers(req: Request, res: Response): void {
    const users = this.userRepository.getAllUsers()
    res.json(users)
  }

  public getUserById(req: Request, res: Response): void {
    const userId = req.params.id
    const user = this.userRepository.getUserById(userId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  }

  public createUser(req: Request, res: Response): void {
    const newUser = req.body
    const createdUser = this.userRepository.createUser(newUser)
    res.status(201).json(createdUser)
  }

  public updateUser(req: Request, res: Response): void {
    const userId = req.params.id
    const updatedUser = req.body
    const user = this.userRepository.updateUser(userId, updatedUser)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  }

  public deleteUser(req: Request, res: Response): void {
    const userId = req.params.id
    const deletedUser = this.userRepository.deleteUser(userId)
    if (deletedUser) {
      res.json(deletedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  }
}

export { UserController }
