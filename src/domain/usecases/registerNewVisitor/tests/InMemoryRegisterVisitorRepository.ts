import { RegisterVisitorRepository } from '../../../repositories/registerVisitorRepository'

export class VisitorRepositorySpy implements RegisterVisitorRepository {
  email?: string
  name?: string
  password?: string
  output = false
  callsCountExists = 0
  callsCountRegister = 0
  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.output
  }

  async register (name: string, email: string, password: string): Promise<void> {
    this.name = name
    this.email = email
    this.password = password
    this.callsCountRegister++
  }
}
