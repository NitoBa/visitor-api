export interface IRegisterVisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
  register: (input: { name: string, email: string, password: string }) => Promise<void>
}
