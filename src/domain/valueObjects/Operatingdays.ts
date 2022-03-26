import { Either, left, right } from '../../shared/either'
import { InvalidOperatingDaysError } from './errors/invalidOperatingDays'

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

  static create (days: string[]): Either<InvalidOperatingDaysError, OperatingDays> {
    if (!OperatingDays.validate(days)) {
      return left(new InvalidOperatingDaysError(days))
    }

    return right(new OperatingDays(days))
  }

  static validate (daysInput: string[]): boolean {
    return daysInput.every(day => {
      if ([...days].includes(day) && daysInput.length === new Set(daysInput).size) {
        return true
      } else {
        return false
      }
    })
  }
}
