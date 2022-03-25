import { DomainError } from '../../../errors/domainError'

export class InvalidEmailError extends Error implements DomainError {
  constructor (public readonly email: string) {
    super(`The email: ${email} is invalid.`)
    this.name = 'InvalidEmailError'
  }
}
