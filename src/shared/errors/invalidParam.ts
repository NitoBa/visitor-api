import { DomainError } from './domainError'

export class InvalidParamError extends Error implements DomainError {
  constructor (public readonly param: string) {
    super(`Error: the param "${param}" is invalid`)
    this.name = 'InvalidParamError'
  }
}
