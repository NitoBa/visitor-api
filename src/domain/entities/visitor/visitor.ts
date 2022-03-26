import { Either, left, right } from '../../../shared/either'
import { Email } from '../../valueObjects/email'
import { InvalidEmailError } from '../../valueObjects/errors/invalidEmail'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { Name } from '../../valueObjects/name'
import { VisitorData } from './visitorData'

export class Visitor {
  private readonly name: Name
  private readonly email: Email

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (visitorData: VisitorData): Either<InvalidEmailError | InvalidNameError, Visitor> {
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
