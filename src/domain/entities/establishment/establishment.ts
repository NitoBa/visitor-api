import { Either, left, right } from '../../../shared/either'
import { DateObject } from '../../valueObjects/date'
import { InvalidDateError } from '../../valueObjects/errors/invalidDate'
import { InvalidHourError } from '../../valueObjects/errors/invalidHour'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { Hour } from '../../valueObjects/hour'
import { Name } from '../../valueObjects/name'
import { EstablishmentData } from './establishmentData'

type EstablishmentResult = Either<InvalidNameError | InvalidHourError, Establishment>

export class Establishment {
  private readonly days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
