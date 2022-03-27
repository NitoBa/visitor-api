import { ITokenGeneratorRepository } from '../../repositories'

export class TokenGeneratorRepositorySpy implements ITokenGeneratorRepository {
  callsCount = 0
  email = 'email'
  generatedToken = 'generatedToken'
  generate (email: string): string {
    this.callsCount++
    this.email = email
    return this.generatedToken
  }
}
