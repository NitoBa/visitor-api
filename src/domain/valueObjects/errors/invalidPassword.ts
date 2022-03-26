import { DomainError } from '../../errors/domainError'

export class InvalidPasswordError extends Error implements DomainError {
  constructor (public readonly password: string) {
    super(`The password: ${password} is invalid.`)
    this.name = 'InvalidPasswordError'
  }
}
