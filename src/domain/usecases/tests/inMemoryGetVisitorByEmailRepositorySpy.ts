import { IGetVisitorByEmailRepository } from '../../repositories'

export class InMemoryGetVisitorByEmailRepository implements IGetVisitorByEmailRepository {
  callsCountExists = 0
  email?: string
  existsVisitor = true
  constructor (existsVisitor: boolean = true) {
    this.existsVisitor = existsVisitor
  }

  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.existsVisitor
  }
}
