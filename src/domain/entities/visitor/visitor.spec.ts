import { randomUUID } from 'crypto'
import { InvalidParamError } from '../../../shared/errors'
import { Visitor } from './visitor'

describe('Visitor Domain Entity', () => {
  it('should not create a visitor with invalid email', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: 'invalidEmail',
      password: 'Test1234.',
      id: randomUUID()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidEmail'))
  })

  it('should not create a visitor with invalid id', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: 'invalidEmail',
      password: 'Test1234.',
      id: 'invalidId'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidId'))
  })

  it('should not create a visitor with invalid email empty', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: '',
      password: '',
      id: randomUUID()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(''))
  })

  it('should not create a visitor with invalid name', () => {
    const sut = Visitor.create({
      name: 'not_valid_name',
      email: 'validemail@gmail.com',
      password: '',
      id: randomUUID()

    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('not_valid_name'))
  })

  it('should not create a visitor with invalid password', () => {
    const sut = Visitor.create({
      name: 'validName',
      email: 'validemail@gmail.com',
      password: 'invalidpassword',
      id: randomUUID()

    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidpassword'))
  })

  it('should create a visitor if correct parameters are provided', () => {
    const sut = Visitor.create({
      name: 'validName',
      email: 'validemail@gmail.com',
      password: 'Test123.',
      id: randomUUID()
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Visitor)
  })
})
