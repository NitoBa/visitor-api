import { Either, left, right } from '../../../shared/either'
import { InvalidHourError } from '../../valueObjects/errors/invalidHour'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { InvalidOperatingDaysError } from '../../valueObjects/errors/invalidOperatingDays'
import { Hour } from '../../valueObjects/hour'
import { Name } from '../../valueObjects/name'
import { OperatingDays } from '../../valueObjects/OperatingDays'
import { EstablishmentData } from './establishmentData'

type EstablishmentResult = Either<InvalidNameError | InvalidHourError, Establishment>

export class Establishment {
  private constructor (
    private readonly name: Name,
    private readonly openHour: Hour,
    private readonly closedHour: Hour,
    private readonly operatingDays: OperatingDays
  ) {}

  static create (establishmentData: EstablishmentData): EstablishmentResult {
    const { name, openHour, closedHour, operatingDays } = establishmentData

    const nameOrError = Name.create(name)
    const openHourOrError = Hour.create(openHour)
    const closedHourOrError = Hour.create(closedHour)
    const operatingDaysOrError = OperatingDays.create(operatingDays)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (openHourOrError.isLeft()) {
      return left(new InvalidHourError(openHour))
    }

    if (closedHourOrError.isLeft()) {
      return left(new InvalidHourError(closedHour))
    }

    if (operatingDaysOrError.isLeft()) {
      return left(new InvalidOperatingDaysError(operatingDays))
    }

    return right(
      new Establishment(
        nameOrError.value,
        openHourOrError.value,
        closedHourOrError.value,
        operatingDaysOrError.value
      ))
  }
}
