import { IAuthenticateVisitorRepository } from '../../../repositories/authenticateVisitorRepository'

export class AuthenticateVisitorRepositorySpy implements IAuthenticateVisitorRepository {
  callsCountExists = 0
  email?: string
  existsVisitor = false
  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.existsVisitor
  }

  async authenticate (input: { email: string, password: string }): Promise<void> {

  }
}
