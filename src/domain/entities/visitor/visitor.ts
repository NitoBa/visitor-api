import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, Name, Password } from '../../valueObjects'
import { VisitorData } from './visitorData'

type VisitorResult = Either<InvalidParamError, Visitor>

export class Visitor {
  private constructor (
    private readonly name: Name,
    private readonly email: Email,
    private readonly password: Password
  ) {}

  static create (visitorData: VisitorData): VisitorResult {
    const { name, email, password } = visitorData

    const emailOrError = Email.create(email)
    const nameOrError = Name.create(name)
    const passwordOrError = Password.create(password)

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    return right(new Visitor(nameOrError.value, emailOrError.value, passwordOrError.value))
  }
}
