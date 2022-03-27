import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Hour, Name, OperatingDays } from '../../valueObjects'
import { EstablishmentData } from './establishmentData'

type EstablishmentResult = Either<InvalidParamError, Establishment>

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
      return left(nameOrError.value)
    }

    if (openHourOrError.isLeft()) {
      return left(openHourOrError.value)
    }

    if (closedHourOrError.isLeft()) {
      return left(closedHourOrError.value)
    }

    if (operatingDaysOrError.isLeft()) {
      return left(operatingDaysOrError.value)
    }

    const establishment = new Establishment(
      nameOrError.value,
      openHourOrError.value,
      closedHourOrError.value,
      operatingDaysOrError.value
    )

    return right(establishment)
  }
}
