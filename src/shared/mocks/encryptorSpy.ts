import { IEncryptorRepository } from '@/data/repositories'

export class EncryptorSpy implements IEncryptorRepository {
  callsCount = 0
  password = 'password'
  hashedPassword = 'hashedPassword'
  encrypt (value: string): string {
    this.callsCount++
    this.password = value
    return this.hashedPassword
  }

  compare (value: string, hash: string): boolean {
    this.callsCount++
    this.password = value
    this.hashedPassword = hash
    return true
  }
}
