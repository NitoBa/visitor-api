import { InvalidParamError } from '../../../shared/errors'
import { Visitor } from './visitor'

describe('Visitor Domain Entity', () => {
  it('should not create a visitor with invalid email', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: 'invalidEmail',
      password: ''
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidEmail'))
  })

  it('should not create a visitor with invalid email empty', () => {
    const sut = Visitor.create({
      name: 'nameValid',
      email: '',
      password: ''
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(''))
  })

  it('should not create a visitor with invalid name', () => {
    const sut = Visitor.create({
      name: 'not_valid_name',
      email: 'validemail@gmail.com',
      password: ''
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('not_valid_name'))
  })

  it('should not create a visitor with invalid password', () => {
    const sut = Visitor.create({
      name: 'validName',
      email: 'validemail@gmail.com',
      password: 'invalidpassword'
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError('invalidpassword'))
  })

  it('should create a visitor if correct parameters are provided', () => {
    const sut = Visitor.create({
      name: 'validName',
      email: 'validemail@gmail.com',
      password: 'Test123.'
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Visitor)
  })
})
