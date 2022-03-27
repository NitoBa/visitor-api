import { Either, left, right } from '../../shared/either'
import { InvalidParamError } from '../../shared/errors'

export class Password {
  private constructor (public readonly password: string) {}
  static create (password: string): Either<InvalidParamError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidParamError(password))
    }
    return right(new Password(password))
  }

  //   password valid must be a string with at least 6 characters and less than 20
  //   contains at least one lowercase and one uppercase letter, one number and one special character
  static validate (password: string): boolean {
    const tester = /.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?,.!$#%*@&_¨()+=-]).{6,20}$/
    return tester.test(password)
  }
}
