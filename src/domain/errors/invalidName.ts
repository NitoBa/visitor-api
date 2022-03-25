import { DomainError } from './domainError'

export class InvalidNameError extends Error implements DomainError {
  constructor (public readonly name: string) {
    super(`This name: ${name} is invalid`)
    this.name = 'InvalidNameError'
  }
}
