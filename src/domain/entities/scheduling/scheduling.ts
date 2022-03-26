import { Either, left, right } from '../../../shared/either'
import { Email } from '../../valueObjects/email'
import { InvalidEmailError } from '../../valueObjects/errors/invalidEmail'
import { InvalidHourError } from '../../valueObjects/errors/invalidHour'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { ID } from '../../valueObjects/id'
import { Name } from '../../valueObjects/name'
import { SchedulingData } from './schedulingData'

type SchedulingResult = Either<
InvalidNameError
| InvalidHourError
| InvalidEmailError,
Scheduling>

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
