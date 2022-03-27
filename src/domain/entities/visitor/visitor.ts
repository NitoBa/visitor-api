import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, ID, Name } from '../../validators'
import { VisitorData } from './visitorData'

type VisitorResult = Either<InvalidParamError, Visitor>

export class Visitor {
  private constructor (
    private readonly id: string,
    private readonly name: string,
    private readonly email: string
  ) {}

  static create (visitorData: VisitorData): VisitorResult {
    const { id, name, email } = visitorData
    const idOrError = ID.create(id)
    const emailOrError = Email.create(email)
    const nameOrError = Name.create(name)

    if (idOrError.isLeft()) {
      return left(idOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const visitor = new Visitor(
      id,
      name,
      email
    )

    return right(visitor)
  }
}
