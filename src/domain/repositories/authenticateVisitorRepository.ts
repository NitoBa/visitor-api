export interface IAuthenticateVisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
  authenticate: (input: { email: string, password: string }) => Promise<void>
}
