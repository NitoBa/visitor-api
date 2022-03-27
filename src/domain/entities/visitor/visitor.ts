import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, ID, Name, Password } from '../../../shared/validators'
import { Entity } from '../entity'
import { VisitorData } from './visitorData'

export class Visitor extends Entity<VisitorData> {
  private constructor (props: VisitorData) {
    super(props)
  }

  static create (props: VisitorData): Either<InvalidParamError, Visitor> {
    const { id, name, email, password } = props
    const idOrError = ID.create(id)
    const emailOrError = Email.create(email)
    const nameOrError = Name.create(name)
    const passwordOrError = Password.create(password)

    if (idOrError.isLeft()) return left(idOrError.value)

    if (emailOrError.isLeft()) return left(emailOrError.value)

    if (nameOrError.isLeft()) return left(nameOrError.value)

    if (passwordOrError.isLeft()) return left(passwordOrError.value)

    return right(new Visitor({ id, name, email, password }))
  }
}
