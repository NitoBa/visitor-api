import { DomainError } from '../../../errors/domainError'

export class VisitorNotRegistered extends Error implements DomainError {
  constructor () {
    super('Visitor not registered')
    this.name = 'VisitorNotRegistered'
  }
}
