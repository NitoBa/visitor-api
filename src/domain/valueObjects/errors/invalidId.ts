import { DomainError } from '../../errors/domainError'

export class InvalidIdError extends Error implements DomainError {
  constructor (id: string) {
    super(`Invalid Id: ${id}`)
    this.name = 'InvalidIdError'
  }
}
