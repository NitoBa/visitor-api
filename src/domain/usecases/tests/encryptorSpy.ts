import { IEncryptorRepository } from '../../repositories'

export class EncryptorSpy implements IEncryptorRepository {
  callsCount = 0
  password = 'password'
  hashedPassword = 'hashedPassword'
  encrypt (value: string): string {
    return ''
  }

  compare (value: string, hash: string): boolean {
    this.callsCount++
    this.password = value
    this.hashedPassword = hash
    return true
  }
}
