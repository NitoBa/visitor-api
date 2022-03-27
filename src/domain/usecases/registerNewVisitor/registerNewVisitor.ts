import { left, right } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { IRegisterVisitorRepository } from '../../repositories/registerVisitorRepository'
import { Email, Name, Password } from '../../valueObjects'
import { AlreadyExistsVisitorError } from './errors'
import { RegisterNewVisitorResponse } from './registerNewVisitorResponse'
import { VisitorRegisterData } from './visitorRegisterData'

interface RegisterVisitor {
  execute: (visitorRegisterData: VisitorRegisterData) => Promise<RegisterNewVisitorResponse>
}

export class RegisterNewVisitor implements RegisterVisitor {
  constructor (private readonly registerVisitorRepository: IRegisterVisitorRepository) {}

  async execute (visitorRegisterData: VisitorRegisterData): Promise<RegisterNewVisitorResponse> {
    const { name, email, password } = visitorRegisterData

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['name', 'email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))

    const isExists = await this.registerVisitorRepository.existsByEmail(email)

    if (isExists) return left(new AlreadyExistsVisitorError(email))

    if (!Name.validate(name)) return left(new InvalidParamError(name))

    if (!Password.validate(password)) return left(new InvalidParamError(password))

    await this.registerVisitorRepository.register({ name, email, password })

    return right(undefined)
  }
}
