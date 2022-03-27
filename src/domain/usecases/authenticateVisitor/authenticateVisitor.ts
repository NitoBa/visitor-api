import { left, right } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { IGetVisitorByEmailRepository } from '../../repositories'
import { IAuthenticateVisitorRepository } from '../../repositories/authenticateVisitorRepository'
import { Email, Password } from '../../valueObjects'
import { AuthenticateVisitorData } from './authenticateVisitorData'
import { AuthenticateVisitorResponse } from './authenticateVisitorResponse'
import { VisitorNotRegistered } from './errors'
import { Encryptor } from './tests/authenticateVisitor.spec'

interface IAuthenticateVisitor {
  execute: (params: AuthenticateVisitorData) => Promise<AuthenticateVisitorResponse>
}

export class AuthenticateVisitor implements IAuthenticateVisitor {
  constructor (
    private readonly getVisitorByEmailRepository: IGetVisitorByEmailRepository,
    private readonly authenticateVisitorRepository: IAuthenticateVisitorRepository,
    private readonly encryptor: Encryptor
  ) {}

  async execute (input: AuthenticateVisitorData): Promise<AuthenticateVisitorResponse> {
    const { email, password } = input
    if (email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))
    if (!Password.validate(password)) return left(new InvalidParamError(password))

    const isExists = await this.getVisitorByEmailRepository.getByEmail(email)
    if (isExists === null || isExists === undefined) return left(new VisitorNotRegistered())

    if (!this.encryptor.compare(password, isExists.password)) return left(new InvalidParamError(password))

    return right(undefined)
  }
}
