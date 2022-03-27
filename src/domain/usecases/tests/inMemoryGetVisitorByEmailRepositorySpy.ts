import { VisitorData } from '../../entities'
import { IGetVisitorByEmailRepository } from '../../repositories'

export class InMemoryGetVisitorByEmailRepository implements IGetVisitorByEmailRepository {
  callsCountExists = 0
  email?: string
  existsVisitor = true
  visitor: VisitorData = {
    name: '',
    email: '',
    password: '',
    id: ''
  }

  constructor (existsVisitor: boolean = true) {
    this.existsVisitor = existsVisitor
  }

  async getByEmail (email: string): Promise<VisitorData | undefined> {
    this.email = email
    this.callsCountExists++

    if (this.existsVisitor) {
      this.visitor = {
        id: '',
        name: 'valid_name',
        email: email,
        password: ''

      }
      return this.visitor
    }
  }

  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.existsVisitor
  }
}
