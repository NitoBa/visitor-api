import { Either, left, right } from '../../../shared/either'
import { InvalidNameError } from '../../errors/invalidName'
import { DateObject } from '../../valueObjects/date'
import { Hour } from '../../valueObjects/hour'
import { Name } from '../../valueObjects/name'
import { InvalidDateError } from './errors/invalidDate'
import { InvalidHourError } from './errors/invalidHour'
import { EstablishmentData } from './establishmentData'

type EstablishmentResult = Either<InvalidNameError | InvalidHourError, Establishment>

export class Establishment {
  private constructor (
    private readonly name: Name,
    private readonly openHour: Hour,
    private readonly closedHour: Hour,
    private readonly date: DateObject
  ) {}

  static create (establishmentData: EstablishmentData): EstablishmentResult {
    const { name, openHour, closedHour, date } = establishmentData

    const nameOrError = Name.create(name)
    const openHourOrError = Hour.create(openHour)
    const closedHourOrError = Hour.create(closedHour)
    const dateOrError = DateObject.create(date)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (openHourOrError.isLeft()) {
      return left(new InvalidHourError(openHour))
    }

    if (closedHourOrError.isLeft()) {
      return left(new InvalidHourError(closedHour))
    }

    if (dateOrError.isLeft()) {
      return left(new InvalidDateError(date))
    }

    return right(
      new Establishment(
        nameOrError.value,
        openHourOrError.value,
        closedHourOrError.value,
        dateOrError.value
      ))
  }
}
