import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, ID, Name, Password } from '../../valueObjects'
import { VisitorData } from './visitorData'

type VisitorResult = Either<InvalidParamError, Visitor>

export class Visitor {
  private constructor (
    private readonly id: ID,
    private readonly name: Name,
    private readonly email: Email,
    private readonly password: Password
  ) {}

  static create (visitorData: VisitorData): VisitorResult {
    const { id, name, email, password } = visitorData
    const idOrError = ID.create(id)
    const emailOrError = Email.create(email)
    const nameOrError = Name.create(name)
    const passwordOrError = Password.create(password)

    if (idOrError.isLeft()) {
      return left(idOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    return right(
      new Visitor(
        idOrError.value,
        nameOrError.value,
        emailOrError.value,
        passwordOrError.value
      )
    )
  }
}
