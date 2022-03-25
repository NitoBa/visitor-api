import { DomainError } from '../../../errors/domainError'

export class InvalidHourError extends Error implements DomainError {
  constructor (public readonly hour: number) {
    super(`The hour: ${hour} is invalid.`)
    this.name = 'InvalidHourError'
  }
}
