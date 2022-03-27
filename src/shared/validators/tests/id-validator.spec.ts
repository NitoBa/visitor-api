import { randomUUID } from 'crypto'
import { InvalidParamError } from '../../errors'
import { ID } from '../id'

describe('ID Validator', () => {
  it('should not create id if is empty', () => {
    const sut = ID.create('')
    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(''))
  })

  it('should not create id if invalid format', () => {
    const id = 'asdasdlakasoasodiad'
    const sut = ID.create(id)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(id))
  })

  it('should not create id if invalid format with more 12 characters', () => {
    const id = 'd'.repeat(13)
    const sut = ID.create(id)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(id))
  })

  it('should not create id if invalid format with less 12 characters', () => {
    const id = 'd'.repeat(11)
    const sut = ID.create(id)
    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(id))
  })

  it('should create id with format uuid', () => {
    const id = randomUUID()
    const sut = ID.create(id)
    expect(sut.isRight()).toBeTruthy()
  })
})
