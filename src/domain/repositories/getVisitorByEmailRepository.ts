import { VisitorData } from '../entities'

export interface IGetVisitorByEmailRepository {
  existsByEmail: (email: string) => Promise<boolean>
  getByEmail: (email: string) => Promise<VisitorData | undefined>
}
