import { Either, left, right } from '../either'
import { InvalidParamError } from '../errors'

export class ID {
  private constructor (private readonly id: string) {}

  static create (id: string): Either<InvalidParamError, ID> {
    if (!ID.validate(id)) {
      return left(new InvalidParamError(id))
    }

    return right(new ID(id))
  }

  static validate (id: string): boolean {
    const tester = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (id.length === 0) {
      return false
    }

    if (!tester.test(id)) {
      return false
    }

    return true
  }
}
