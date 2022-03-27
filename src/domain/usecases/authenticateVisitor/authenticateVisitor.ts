import { left, right } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../errors'
import { IAuthenticateVisitorRepository } from '../../repositories/authenticateVisitorRepository'
import { Email, Password } from '../../valueObjects'
import { AuthenticateVisitorData } from './authenticateVisitorData'
import { AuthenticateVisitorResponse } from './authenticateVisitorResponse'
import { VisitorNotRegistered } from './errors'

interface IAuthenticateVisitor {
  execute: (params: AuthenticateVisitorData) => Promise<AuthenticateVisitorResponse>
}

export class AuthenticateVisitor implements IAuthenticateVisitor {
  constructor (private readonly authenticateVisitorRepository: IAuthenticateVisitorRepository) {}
  async execute (input: AuthenticateVisitorData): Promise<AuthenticateVisitorResponse> {
    const { email, password } = input
    if (email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))
    if (!Password.validate(password)) return left(new InvalidParamError(password))

    const isExists = await this.authenticateVisitorRepository.existsByEmail(email)
    if (!isExists) return left(new VisitorNotRegistered())
    return right(undefined)
  }
}
