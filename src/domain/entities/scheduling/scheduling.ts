import { Either, left, right } from '../../../shared/either'
import { Email } from '../../valueObjects/email'
import { InvalidEmailError } from '../../valueObjects/errors/invalidEmail'
import { InvalidHourError } from '../../valueObjects/errors/invalidHour'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { Name } from '../../valueObjects/name'
import { SchedulingData } from './schedulingData'

type SchedulingResult = Either<
InvalidNameError
| InvalidHourError
| InvalidEmailError,
Scheduling>

export class Scheduling {
  private readonly visitorName: Name
  private readonly visitorEmail: Email
  private readonly establishmentName: Name
  private readonly createdAt: Date
  private readonly updatedAt: Date
  private constructor (
    visitorName: Name,
    visitorEmail: Email,
    establishmentName: Name,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.visitorName = visitorName
    this.visitorEmail = visitorEmail
    this.establishmentName = establishmentName
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create (schedulingData: SchedulingData): SchedulingResult {
    const {
      visitorName,
      visitorEmail,
      establishmentName,
      createdAt,
      updatedAt
    } = schedulingData
    const visitorNameOrError = Name.create(visitorName)
    const establishmentNameOrError = Name.create(establishmentName)
    const visitorEmailOrError = Email.create(visitorEmail)

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
      visitorNameOrError.value,
      visitorEmailOrError.value,
      establishmentNameOrError.value,
      createdAt,
      updatedAt
    )

    return right(newSchedule)
  }
}
