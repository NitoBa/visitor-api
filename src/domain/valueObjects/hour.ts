import { Either, left, right } from '../../shared/either'
import { InvalidHourError } from './errors/invalidHour'

export class Hour {
  private constructor (public readonly hour: number) {}

  static create (hour: number): Either<InvalidHourError, Hour> {
    if (hour < 0 || hour > 23) {
      return left(new InvalidHourError(hour))
    }

    return right(new Hour(hour))
  }
}
