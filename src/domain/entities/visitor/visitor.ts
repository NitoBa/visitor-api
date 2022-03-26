import { Either, left, right } from '../../../shared/either'
import { Email, Name } from '../../valueObjects'
import { InvalidEmailError, InvalidNameError } from '../../valueObjects/errors'
import { VisitorData } from './visitorData'

type VisitorResult = Either<InvalidEmailError | InvalidNameError, Visitor>

export class Visitor {
  private constructor (
    private readonly name: Name,
    private readonly email: Email
  ) {}

  static create (visitorData: VisitorData): VisitorResult {
    const { name, email } = visitorData

    const emailOrError = Email.create(email)
    const nameOrError = Name.create(name)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    return right(new Visitor(nameOrError.value, emailOrError.value))
  }
}
