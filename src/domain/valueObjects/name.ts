
import { Either, left, right } from '../../shared/either'
import { InvalidParamError } from '../../shared/errors'

export class Name {
  private constructor (private readonly name: string) {}

  get value (): string {
    return this.name
  }

  static create (name: string): Either<InvalidParamError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name))
    }
    return left(new InvalidParamError(name))
  }

  static validate (name: string): boolean {
    const tester = /^[^0-9?,.!$#%*@&_¨()+=-]+$/

    if (name.length === 0 || name.trim().length < 5 || name.trim().length > 255) {
      return false
    }

    if (!tester.test(name)) {
      return false
    }
    return true
  }
}
