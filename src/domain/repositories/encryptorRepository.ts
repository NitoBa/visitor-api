export interface IEncryptorRepository {
  encrypt: (value: string) => string
  compare: (value: string, hash: string) => boolean
}
