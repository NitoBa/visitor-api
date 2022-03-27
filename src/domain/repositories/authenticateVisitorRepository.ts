export interface IAuthenticateVisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
  authenticate: (email: string, password: string) => Promise<void>
}
