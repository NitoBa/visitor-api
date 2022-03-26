import { Either, left, right } from '../../shared/either'
import { InvalidDayWorkError } from './errors/invalidDayWork'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export class DaysWork {
  private constructor (public readonly days: string[]) {}

  static create (days: string[]): Either<InvalidDayWorkError, DaysWork> {
    if (!DaysWork.validate(days)) {
      return left(new InvalidDayWorkError(days))
    }

    return right(new DaysWork(days))
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
