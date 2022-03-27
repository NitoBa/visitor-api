import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, Name } from '../../valueObjects'
import { VisitorData } from './visitorData'

type VisitorResult = Either<InvalidParamError, Visitor>

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
      return left(emailOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    return right(new Visitor(nameOrError.value, emailOrError.value))
  }
}
