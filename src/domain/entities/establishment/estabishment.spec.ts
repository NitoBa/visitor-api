
import { InvalidDateError } from '../../valueObjects/errors/invalidDate'
import { InvalidHourError } from '../../valueObjects/errors/invalidHour'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { Establishment } from './establishment'

describe('Establishment Domain Entity', () => {
  it('should not create an establishment without name', () => {
    const sut = Establishment.create({ name: '', openHour: 12, closedHour: 13, date: '21/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidNameError)
  })

  it('should not create an establishment with invalid open hour more 23', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 25, closedHour: 13, date: '21/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidHourError)
  })

  it('should not create an establishment with invalid open hour less 0', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: -1, closedHour: 13, date: '21/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidHourError)
  })

  it('should not create an establishment with invalid closed hour less 0', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour: -1, date: '21/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidHourError)
  })

  it('should not create an establishment with invalid closed hour less 0', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour: 24, date: '21/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidHourError)
  })

  it('should not create an establishment with invalid date', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour: 23, date: '32/10/2021' })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidDateError)
  })

  it('should create an establishment with valid data', () => {
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour: 18, date: '28/10/2021' })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Establishment)
  })
})
