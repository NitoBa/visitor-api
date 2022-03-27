import { IUpdateAccessTokenRepository } from '@/data/repositories'

export class UpdateAccessTokenRepositorySpy implements IUpdateAccessTokenRepository {
  callsCount = 0
  accessToken?: string
  userId?: string
  async update (input: { accessToken: string, userId: string }): Promise<void> {
    this.callsCount++
    this.accessToken = input.accessToken
    this.userId = input.userId
    return undefined
  }
}
