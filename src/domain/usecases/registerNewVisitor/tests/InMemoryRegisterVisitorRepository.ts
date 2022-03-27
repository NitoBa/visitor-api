import { IRegisterVisitorRepository } from '../../../repositories/registerVisitorRepository'

export class VisitorRepositorySpy implements IRegisterVisitorRepository {
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

  async register (input: {name: string, email: string, password: string}): Promise<void> {
    this.name = input.name
    this.email = input.email
    this.password = input.password
    this.callsCountRegister++
  }
}
