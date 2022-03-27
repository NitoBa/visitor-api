export interface ITokenGeneratorRepository {
  generate: (email: string) => string
}
