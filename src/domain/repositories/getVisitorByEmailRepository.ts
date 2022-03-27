export interface IGetVisitorByEmailRepository {
  getByEmail: (email: string) => Promise<boolean>
}
