import { Establishment } from '@/domain/entities'
import { IGetEstablishmentById } from '@/domain/usecases'
import { InvalidParamError, MissingParamsError, NotFoundError } from '@/shared/errors'
import { GetEstablishmentByIdRepositorySpy } from '@/shared/mocks'
import { randomUUID } from 'crypto'
import { GetEstablishmentById } from '../getEstablishmentById'

const makeSut = (): {
  sut: IGetEstablishmentById
  getEstablishmentByIdRepositorySpy: GetEstablishmentByIdRepositorySpy
} => {
  const getEstablishmentByIdRepositorySpy = new GetEstablishmentByIdRepositorySpy()
  const sut = new GetEstablishmentById(getEstablishmentByIdRepositorySpy)
  return { sut, getEstablishmentByIdRepositorySpy }
}

describe('Get Establishment By ID Usecase', () => {
  it('should return an error if id not provided', async () => {
    const { sut } = makeSut()
    const result = await sut.execute('')
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new MissingParamsError(['id']))
  })

  it('should return an error if id is invalid', async () => {
    const { sut } = makeSut()
    const result = await sut.execute('invalid_id')
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError('invalid_id'))
  })

  it('should call getEstablishmentsRepositorySpy with correct parameters', async () => {
    const { sut, getEstablishmentByIdRepositorySpy } = makeSut()
    const id = randomUUID()
    await sut.execute(id)
    expect(getEstablishmentByIdRepositorySpy.callsCount).toBe(1)
    expect(getEstablishmentByIdRepositorySpy.id).toBe(id)
  })

  it('should return a undefined if not found an establishment', async () => {
    const { sut } = makeSut()
    const id = randomUUID()
    const result = await sut.execute(id)
    expect(result.isLeft()).toBeTruthy()

    expect(result.value).toEqual(new NotFoundError(id))
  })

  it('should return a establishment when call with correct id', async () => {
    const { sut, getEstablishmentByIdRepositorySpy } = makeSut()
    const id = randomUUID()
    getEstablishmentByIdRepositorySpy.establishments.push({
      id,
      name: 'Valid Name',
      openHour: 1,
      closedHour: 2,
      operatingDays: ['Monday', 'Tuesday']
    })
    const result = await sut.execute(id)
    expect(result.isRight()).toBeTruthy()

    const founded = getEstablishmentByIdRepositorySpy.establishments.find(establishment => establishment.id === id)
    expect((result.value as Establishment).props.id).toEqual(founded?.id)
  })
})
