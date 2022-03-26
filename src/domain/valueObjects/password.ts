import { Either, left, right } from '../../shared/either'
import { InvalidPasswordError } from './errors'

export class Password {
  private constructor (private readonly password: string) {}
  static create (password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }
    return right(new Password(password))
  }

  static validate (password: string): boolean {
    const tester = /.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?,.!$#%*@&_¨()+=-]).{6,20}$/
    return tester.test(password)
  }
}
