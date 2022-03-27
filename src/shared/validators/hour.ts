import { Either, left, right } from '../either'
import { InvalidParamError } from '../errors'

export class Hour {
  private constructor (public readonly hour: number) {}

  static create (hour: number): Either<InvalidParamError, Hour> {
    if (!Hour.validate(hour)) {
      return left(new InvalidParamError(hour.toString()))
    }
    return right(new Hour(hour))
  }

  static validate (hour: number): boolean {
    if (hour === undefined || hour === null) return false

    if (hour < 0 || hour > 23) return false

    return true
  }
}
