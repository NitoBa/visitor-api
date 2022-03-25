import { Either, left, right } from '../../../shared/either'
import { InvalidNameError } from '../../errors/invalidName'
import { Hour } from '../../valueObjects/hour'
import { Name } from '../../valueObjects/name'
import { InvalidHourError } from './errors/invalidHour'
import { EstablishmentData } from './establishmentData'

type EstablishmentResult = Either<InvalidNameError | InvalidHourError, Establishment>

export class Establishment {
  private readonly name: Name
  private readonly openHour: Hour
  private readonly closedHour: Hour
  private constructor (name: Name, openHour: Hour, closedHour: Hour) {
    this.name = name
    this.openHour = openHour
    this.closedHour = closedHour
  }

  static create (establishmentData: EstablishmentData): EstablishmentResult {
    const { name, openHour, closedHour } = establishmentData

    const nameOrError = Name.create(name)
    const openHourOrError = Hour.create(openHour)
    const closedHourOrError = Hour.create(closedHour)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (openHourOrError.isLeft()) {
      return left(new InvalidHourError(openHour))
    }

    if (closedHourOrError.isLeft()) {
      return left(new InvalidHourError(closedHour))
    }

    return right(new Establishment(nameOrError.value, openHourOrError.value, closedHourOrError.value))
  }
}
