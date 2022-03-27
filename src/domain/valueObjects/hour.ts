import { Either, left, right } from '../../shared/either'
import { InvalidParamError } from '../../shared/errors'

export class Hour {
  private constructor (public readonly hour: number) {}

  static create (hour: number): Either<InvalidParamError, Hour> {
    if (hour < 0 || hour > 23) {
      return left(new InvalidParamError(hour.toString()))
    }

    return right(new Hour(hour))
  }
}
