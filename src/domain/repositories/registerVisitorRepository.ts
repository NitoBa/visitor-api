export interface RegisterVisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<void>
}
