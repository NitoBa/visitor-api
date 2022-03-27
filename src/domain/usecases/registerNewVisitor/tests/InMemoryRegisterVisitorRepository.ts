import { IRegisterVisitorRepository } from '../../../repositories/registerVisitorRepository'

export class VisitorRepositorySpy implements IRegisterVisitorRepository {
  email?: string
  name?: string
  password?: string
  output = false
  callsCountRegister = 0

  async register (input: {name: string, email: string, password: string}): Promise<void> {
    this.name = input.name
    this.email = input.email
    this.password = input.password
    this.callsCountRegister++
  }
}
