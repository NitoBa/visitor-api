import { Either, left, right } from '../../shared/either'
import { InvalidParamError } from '../../shared/errors'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export class OperatingDays {
  private constructor (public readonly days: string[]) {}

  static create (days: string[]): Either<InvalidParamError, OperatingDays> {
    if (!OperatingDays.validate(days)) {
      return left(new InvalidParamError(days.toString()))
    }

    return right(new OperatingDays(days))
  }

  static validate (daysInput: string[]): boolean {
    if (daysInput.length === 0) return false

    return daysInput.every(day => {
      if (days.includes(day) && daysInput.length === new Set(daysInput).size) {
        return true
      } else {
        return false
      }
    })
  }
}
