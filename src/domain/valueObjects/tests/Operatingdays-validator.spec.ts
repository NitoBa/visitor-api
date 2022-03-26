import { OperatingDays } from '../Operatingdays'

describe('Days Work Validator', () => {
  it('should not create a days work if not include a valid days', () => {
    const days = ['Suday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const sut = OperatingDays.create(days)
    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a days work if not include a day', () => {
    const days = ['']

    const sut = OperatingDays.create(days)
    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a days work if include duplicated days', () => {
    const days = ['Monday', 'Monday', 'Monday']

    const sut = OperatingDays.create(days)
    expect(sut.isLeft()).toBeTruthy()
  })

  it('should create a days work if include valid days', () => {
    const days = ['Monday', 'Wednesday', 'Friday']

    const sut = OperatingDays.create(days)
    expect(sut.isRight()).toBeTruthy()
  })
})
