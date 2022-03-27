import { VisitorData } from '../../domain/entities'

export interface IGetVisitorByEmailRepository {
  existsByEmail: (email: string) => Promise<boolean>
  getByEmail: (email: string) => Promise<VisitorData | undefined>
}
