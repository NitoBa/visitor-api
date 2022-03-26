import { Either, left, right } from '../../shared/either'
import { InvalidParamError } from '../errors'

export class Password {
  private constructor (public readonly password: string) {}
  static create (password: string): Either<InvalidParamError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidParamError(password))
    }
    return right(new Password(password))
  }

  static validate (password: string): boolean {
    const tester = /.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?,.!$#%*@&_¨()+=-]).{6,20}$/
    return tester.test(password)
  }
}
