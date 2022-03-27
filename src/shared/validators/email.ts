
import { Either, left, right } from '../either'
import { InvalidParamError } from '../errors'

export class Email {
  private constructor (private readonly email: string) {}

  static create (email: string): Either<InvalidParamError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidParamError(email))
    }
    return right(new Email(email))
  }

  get value (): string {
    return this.email
  }

  static validate (email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (email.length === 0) {
      return false
    }
    if (email.length > 256) {
      return false
    }
    if (!tester.test(email)) {
      return false
    }
    const [account, address] = email.split('@')
    if (account.length > 64) {
      return false
    }
    if (account.length < 5) {
      return false
    }
    const domainParts = address.split('.')
    if (domainParts.some(part => part.length > 63)) {
      return false
    }
    return true
  }
}
