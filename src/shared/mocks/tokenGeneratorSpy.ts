import { ITokenGeneratorRepository } from '../../domain/repositories'

export class TokenGeneratorRepositorySpy implements ITokenGeneratorRepository {
  callsCount = 0
  id = 'userId'
  generatedToken = 'generatedToken'
  generate (id: string): string {
    this.callsCount++
    this.id = id
    return this.generatedToken
  }
}
