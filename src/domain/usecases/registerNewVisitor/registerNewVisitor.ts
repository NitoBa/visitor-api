import { left, right } from '../../../shared/either'
import { RegisterVisitorRepository } from '../../repositories/registerVisitorRepository'
import { Email, Name, Password } from '../../valueObjects'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../valueObjects/errors'
import { AlreadyExistsVisitorError, MissingParamsError } from './errors'
import { RegisterVisitorResponse } from './registerNewVisitorResponse'
import { VisitorRegisterData } from './visitorRegisterData'

interface RegisterVisitor {
  execute: (visitorRegisterData: VisitorRegisterData) => Promise<RegisterVisitorResponse>
}

export class RegisterNewVisitor implements RegisterVisitor {
  constructor (private readonly registerVisitorRepository: RegisterVisitorRepository) {}

  async execute (visitorRegisterData: VisitorRegisterData): Promise<RegisterVisitorResponse> {
    const { name, email, password } = visitorRegisterData

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['name', 'email', 'password']))
    }

    if (!Email.validate(email)) {
      return left(new InvalidEmailError(email))
    }

    const isExists = await this.registerVisitorRepository.existsByEmail(email)

    if (isExists) return left(new AlreadyExistsVisitorError(email))

    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }

    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }

    await this.registerVisitorRepository.register(name, email, password)

    return right(undefined)
  }
}
