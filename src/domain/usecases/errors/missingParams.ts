import { DomainError } from '../../errors/domainError'

export class MissingParamsError extends Error implements DomainError {
  constructor (public readonly params: string[]) {
    super(`Error: ${params.toString()} is missing`)
    this.name = 'MissingParamsError'
  }
}
