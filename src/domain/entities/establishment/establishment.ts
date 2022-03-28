import { Either, left, right } from '@/shared/either'
import { InvalidParamError } from '@/shared/errors'
import { Hour, Name, OperatingDays } from '@/shared/validators'
import { Entity } from '../../../shared/domain/entities/entity'
import { EstablishmentData } from './establishmentData'

export class Establishment extends Entity<EstablishmentData> {
  private constructor (props: EstablishmentData) {
    super(props)
  }

  get props (): EstablishmentData { return this._props as EstablishmentData }

  static create (establishmentData: EstablishmentData): Either<InvalidParamError, Establishment> {
    const { id, name, openHour, closedHour, operatingDays } = establishmentData

    const nameOrError = Name.create(name)
    const openHourOrError = Hour.create(openHour)
    const closedHourOrError = Hour.create(closedHour)
    const operatingDaysOrError = OperatingDays.create(operatingDays)

    if (nameOrError.isLeft()) return left(nameOrError.value)

    if (openHourOrError.isLeft()) return left(openHourOrError.value)

    if (closedHourOrError.isLeft()) return left(closedHourOrError.value)

    if (operatingDaysOrError.isLeft()) return left(operatingDaysOrError.value)

    const establishment = new Establishment({
      id,
      name,
      openHour,
      closedHour,
      operatingDays
    })

    return right(establishment)
  }
}
