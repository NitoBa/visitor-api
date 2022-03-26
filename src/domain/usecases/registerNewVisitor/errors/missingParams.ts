import { DomainError } from '../../../errors/domainError'

export class MissingParamsError extends Error implements DomainError {
  constructor (public readonly params: string[]) {
    super(`Error: ${params.toString()} is missing`)
    this.name = 'MissingParamsError'
  }
}

export class InvalidParamError extends Error implements DomainError {
  constructor (public readonly param: string) {
    super(`Error: ${param} is invalid`)
    this.name = 'InvalidParamError'
  }
}
