import { Either, left, right } from '../../../shared/either'
import { InvalidParamError } from '../../../shared/errors'
import { Email, ID, Name } from '../../valueObjects'
import { SchedulingData } from './schedulingData'

type SchedulingResult = Either<InvalidParamError, Scheduling>

export class Scheduling {
  private constructor (
    private readonly id: string,
    private readonly visitorName: Name,
    private readonly visitorEmail: Email,
    private readonly establishmentName: Name,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  static create (schedulingData: SchedulingData): SchedulingResult {
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

    if (idOrError.isLeft()) {
      return left(idOrError.value)
    }

    if (visitorNameOrError.isLeft()) {
      return left(visitorNameOrError.value)
    }

    if (visitorEmailOrError.isLeft()) {
      return left(visitorEmailOrError.value)
    }

    if (establishmentNameOrError.isLeft()) {
      return left(establishmentNameOrError.value)
    }

    const newSchedule = new Scheduling(
      id,
      visitorNameOrError.value,
      visitorEmailOrError.value,
      establishmentNameOrError.value,
      createdAt,
      updatedAt
    )

    return right(newSchedule)
  }
}
