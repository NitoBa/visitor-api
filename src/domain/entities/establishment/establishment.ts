import { Name } from '../../valueObjects/name'

export class Establishment {
  private readonly name: Name
  private constructor (name: Name) {
    this.name = name
  }
}
