export interface IAuthenticateVisitorRepository {
  authenticate: (input: { email: string, password: string }) => Promise<void>
}
