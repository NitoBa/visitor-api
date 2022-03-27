import { InvalidParamError } from '@/shared/errors'
import { randomUUID } from 'crypto'
import { Visitor } from './visitor'

describe('Visitor Domain Entity', () => {
  it('should not create a visitor with invalid email', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: 'invalidEmail',
      id: randomUUID(),
      password: 'Test1234.'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidEmail'))
  })

  it('should not create a visitor with invalid id', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: 'invalidEmail',
      id: 'invalidId',
      password: 'Test1234.'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidId'))
  })

  it('should not create a visitor with invalid email empty', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: '',
      id: randomUUID(),
      password: 'Test1234.'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(''))
  })

  it('should not create a visitor with invalid name', () => {
    const sut = Visitor.create({
      name: 'not_valid_name',
      email: 'validemail@gmail.com',
      id: randomUUID(),
      password: 'Test1234.'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('not_valid_name'))
  })

  it('should create a visitor if correct parameters are provided', () => {
    const sut = Visitor.create({
      name: 'validName',
      email: 'validemail@gmail.com',
      id: randomUUID(),
      password: 'Test1234.'
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Visitor)
  })
})
