import { DomainError } from '@/domain/errors/domainError'

export class NotFoundError extends Error implements DomainError {
  constructor (public readonly param: string) {
    super(`The item "${param}" not founded`)
    this.name = 'NotFoundError'
  }
}
