import { ITokenGeneratorRepository } from '../../repositories'

export class TokenGeneratorRepositorySpy implements ITokenGeneratorRepository {
  callsCount = 0
  id = 'email'
  generatedToken = 'generatedToken'
  generate (id: string): string {
    this.callsCount++
    this.id = id
    return this.generatedToken
  }
}
