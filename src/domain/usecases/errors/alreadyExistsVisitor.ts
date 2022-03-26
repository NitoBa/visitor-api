import { DomainError } from '../../errors/domainError'

export class AlreadyExistsVisitorError extends Error implements DomainError {
  constructor (public readonly email: string) {
    super(`Error: the visitor with email "${email}" already exists`)
    this.name = 'AlreadyExistsError'
  }
}
