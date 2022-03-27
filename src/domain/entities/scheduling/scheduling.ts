import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, ID, Name } from '../../validators'
import { Entity } from '../entity'
import { SchedulingData } from './schedulingData'

export class Scheduling extends Entity<SchedulingData> {
  private constructor (props: SchedulingData) {
    super(props)
  }

  static create (schedulingData: SchedulingData): Either<InvalidParamError, Scheduling> {
    const {
      id,
      visitorName,
      visitorEmail,
      establishmentName,
      createdAt,
      updatedAt
    } = schedulingData
    const idOrError = ID.create(id)
    const visitorNameOrError = Name.create(visitorName)
    const establishmentNameOrError = Name.create(establishmentName)
    const visitorEmailOrError = Email.create(visitorEmail)

    if (idOrError.isLeft()) return left(idOrError.value)

    if (visitorNameOrError.isLeft()) return left(visitorNameOrError.value)

    if (visitorEmailOrError.isLeft()) return left(visitorEmailOrError.value)

    if (establishmentNameOrError.isLeft()) return left(establishmentNameOrError.value)

    const newSchedule = new Scheduling({
      id,
      visitorName,
      visitorEmail,
      establishmentName,
      createdAt,
      updatedAt
    })

    return right(newSchedule)
  }
}
