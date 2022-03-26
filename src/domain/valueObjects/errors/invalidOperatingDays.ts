import { DomainError } from '../../errors/domainError'

export class InvalidOperatingDaysError extends Error implements DomainError {
  constructor (public readonly days: string[]) {
    super(`The days: ${days.toString()} are invalids.`)
    this.name = 'InvalidOperatingDaysError'
  }
}
