import { DomainError } from '../../../errors/domainError'

export class InvalidDateError extends Error implements DomainError {
  constructor (public readonly date: string) {
    super(`The date: ${date} is invalid.`)
    this.name = 'InvalidDateError'
  }
}
