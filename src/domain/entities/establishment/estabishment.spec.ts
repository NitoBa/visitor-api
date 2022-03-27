import { InvalidParamError } from '../../../shared/errors'
import { Establishment } from './establishment'

describe('Establishment Domain Entity', () => {
  it('should not create an establishment without name', () => {
    const name = ''
    const sut = Establishment.create({ name, openHour: 12, closedHour: 13, operatingDays: [] })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(name))
  })

  it('should not create an establishment with invalid open hour more 23', () => {
    const openHour = 25
    const sut = Establishment.create({ name: 'Rocketseat', openHour, closedHour: 13, operatingDays: [] })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(openHour.toString()))
  })

  it('should not create an establishment with invalid open hour less 0', () => {
    const openHour = -1
    const sut = Establishment.create({ name: 'Rocketseat', openHour, closedHour: 13, operatingDays: [] })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(openHour.toString()))
  })

  it('should not create an establishment with invalid closed hour less 0', () => {
    const closedHour = -1
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour, operatingDays: [] })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(closedHour.toString()))
  })

  it('should not create an establishment with invalid closed hour more 23', () => {
    const closedHour = 25
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour, operatingDays: [] })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(closedHour.toString()))
  })

  it('should not create an establishment with invalid operating days', () => {
    const operatingDays: string[] = []
    const sut = Establishment.create({ name: 'Rocketseat', openHour: 12, closedHour: 23, operatingDays })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(operatingDays.toString()))
  })

  it('should create an establishment with valid data', () => {
    const sut = Establishment.create(
      {
        name: 'Rocketseat',
        openHour: 12,
        closedHour: 18,
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    )

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Establishment)
  })
})
