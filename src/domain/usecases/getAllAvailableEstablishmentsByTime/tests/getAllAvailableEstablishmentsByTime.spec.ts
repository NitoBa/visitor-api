import { InvalidParamError, MissingParamsError } from '../../../../shared/errors'
import { Establishment } from '../../../entities'
import { GetAllAvailableEstablishmentsByTime } from '../getAllAvailableEstablishmentsByTime'

const makeSut = (): {
  sut: GetAllAvailableEstablishmentsByTime
} => {
  const sut = new GetAllAvailableEstablishmentsByTime()

  return {
    sut
  }
}

describe('Get All Available Establishments By Time', () => {
  it('should return an error if start time and end time are undefined or null', async () => {
    const { sut } = makeSut()
    const inputData = jest.fn()({ openHour: null, closedHour: null })
    const result = await sut.execute(inputData)
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new MissingParamsError(['openHour', 'closedHour']))
  })

  it('should return an error if open hour is invalid', async () => {
    const { sut } = makeSut()
    const openHour = -1
    const result = await sut.execute({ openHour, closedHour: 14 })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(openHour.toString()))
  })

  it('should return an error if closed hour is invalid', async () => {
    const { sut } = makeSut()
    const openHour = 15
    const closedHour = 25
    const result = await sut.execute({ openHour, closedHour })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(closedHour.toString()))
  })

  it('should return an empty list if open hour and closed not match', async () => {
    const { sut } = makeSut()
    const openHour = 12
    const closedHour = 18
    const result = await sut.execute({ openHour, closedHour })
    expect(result.isRight).toBeTruthy()
    expect(result.value).toEqual(new Array<Establishment>())
  })
  //   it('should return an error if end time is invalid', () => {

//   })
})
