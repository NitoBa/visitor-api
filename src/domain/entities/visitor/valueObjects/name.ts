import { Either, left, right } from '../../../../shared/either'
import { InvalidNameError } from '../errors/invalidName'

export class Name {
  private constructor (private readonly name: string) {}

  get value (): string {
    return this.name
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (Name.validate(name)) {
      return right(new Name(name))
    }
    return left(new InvalidNameError(name))
  }

  static validate (name: string): boolean {
    const tester = /^[^0-9A-Z?,.!$#%*@&_¨()+=-]+$/

    if (name.length === 0 || name.trim().length < 5 || name.trim().length > 255) {
      return false
    }

    if (!tester.test(name)) {
      return false
    }
    return true
  }
}
