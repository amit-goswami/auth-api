import { Request, Response } from 'express'
import {
  createUser,
  findUserByEmail,
  findUserById
} from '../../service/user.service'
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput
} from '../../schemas/user.schema'
import { nanoid } from 'nanoid'
import { Logger } from '../../logger'

class UserController {
  constructor() {}

  public async createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
  ) {
    const body = req.body

    try {
      const user = await createUser(body)

      return res.send('User successfully created')
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send('Account already exists')
      }

      return res.status(500).send(e)
    }
  }

  public async verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id
    const verificationCode = req.params.verificationCode

    const user = await findUserById(id)

    if (!user) {
      return res.send('Could not verify user')
    }

    if (user.verified) {
      return res.send('User is already verified')
    }

    if (user.verificationCode === verificationCode) {
      user.verified = true

      await user.save()

      return res.send('User successfully verified')
    }

    return res.send('Could not verify user')
  }

  public async forgotPasswordHandler(
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response
  ) {
    const message =
      'If a user with that email is registered you will receive a password reset email'

    const { email } = req.body

    const user = await findUserByEmail(email)

    if (!user) {
      Logger.log(`User with email ${email} does not exists`)
      return res.send(message)
    }

    if (!user.verified) {
      return res.send('User is not verified')
    }

    const passwordResetCode = nanoid()

    user.passwordResetCode = passwordResetCode

    await user.save()

    // await sendEmail({
    //   to: user.email,
    //   from: 'test@example.com',
    //   subject: 'Reset your password',
    //   text: `Password reset code: ${passwordResetCode}. Id ${user._id}`
    // })

    Logger.log(`Password reset email sent to ${email}`)

    return res.send(message)
  }

  public async resetPasswordHandler(
    req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
    res: Response
  ) {
    const { id, passwordResetCode } = req.params

    const { password } = req.body

    const user = await findUserById(id)

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      return res.status(400).send('Could not reset user password')
    }

    user.passwordResetCode = null

    user.password = password

    await user.save()

    return res.send('Successfully updated password')
  }

  public async getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user)
  }
}

export { UserController }
