export interface IGetVisitorByEmailRepository {
  existsByEmail: (email: string) => Promise<boolean>
}
