import { Either, left, right } from '@/shared/either'
import { InvalidParamError } from '@/shared/errors'
import { ID } from '@/shared/validators'
import { Entity } from '../../../shared/domain/entities/entity'
import { AppointmentData } from './appointmentData'

export class Appointment extends Entity<AppointmentData> {
  private constructor (props: AppointmentData) {
    super(props)
  }

  static create (appointmentData: AppointmentData): Either<InvalidParamError, Appointment> {
    const {
      id,
      visitorId,
      establishmentId,
      createdAt,
      updatedAt
    } = appointmentData
    const idOrError = ID.create(id)
    const visitorIdOrError = ID.create(visitorId)
    const establishmentIdOrError = ID.create(establishmentId)

    if (idOrError.isLeft()) return left(idOrError.value)
    if (visitorIdOrError.isLeft()) return left(visitorIdOrError.value)
    if (establishmentIdOrError.isLeft()) return left(establishmentIdOrError.value)

    const newSchedule = new Appointment({
      id,
      visitorId,
      establishmentId,
      createdAt,
      updatedAt
    })

    return right(newSchedule)
  }
}
