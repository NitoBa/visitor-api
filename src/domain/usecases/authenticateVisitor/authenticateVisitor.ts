import { left, right } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { IEncryptorRepository, IGetVisitorByEmailRepository, ITokenGeneratorRepository } from '../../repositories'
import { Email, Password } from '../../valueObjects'
import { AuthenticateVisitorData } from './authenticateVisitorData'
import { AuthenticateVisitorResponse } from './authenticateVisitorResponse'
import { VisitorNotRegistered } from './errors'

interface IAuthenticateVisitor {
  execute: (params: AuthenticateVisitorData) => Promise<AuthenticateVisitorResponse>
}

export interface AuthenticateVisitorDeps {
  getVisitorByEmailRepository: IGetVisitorByEmailRepository
  encryptorRepository: IEncryptorRepository
  tokenGeneratorRepository: ITokenGeneratorRepository
}

export class AuthenticateVisitor implements IAuthenticateVisitor {
  constructor (
    private readonly deps: AuthenticateVisitorDeps
  ) {}

  async execute (input: AuthenticateVisitorData): Promise<AuthenticateVisitorResponse> {
    const {
      getVisitorByEmailRepository,
      encryptorRepository,
      tokenGeneratorRepository
    } = this.deps

    const { email, password } = input

    if (email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))
    if (!Password.validate(password)) return left(new InvalidParamError(password))

    const isVisitorExistents = await getVisitorByEmailRepository.getByEmail(email)

    if (isVisitorExistents === null || isVisitorExistents === undefined) {
      return left(new VisitorNotRegistered())
    }

    if (!encryptorRepository.compare(password, isVisitorExistents.password)) {
      return left(new InvalidParamError(password))
    }

    return right(tokenGeneratorRepository.generate(isVisitorExistents.id))
  }
}
