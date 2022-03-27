export interface IRegisterVisitorRepository {
  register: (input: { name: string, email: string, password: string }) => Promise<void>
}
