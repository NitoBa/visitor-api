import { InvalidEmailError } from '../../valueObjects/errors/invalidEmail'
import { InvalidNameError } from '../../valueObjects/errors/invalidName'
import { Scheduling } from './scheduling'

describe('Scheduling Domain Entity', () => {
  it('should not create a Scheduling Entity without a Visitor Name', () => {
    const sut = Scheduling.create({
      visitorName: '',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidNameError)
  })

  it('should not create a Scheduling Entity without a Visitor Name Invalid', () => {
    const invalidName = 'invalid_visitor name'
    const sut = Scheduling.create({
      visitorName: invalidName,
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidNameError(invalidName))
  })

  it('should not create a Scheduling Entity without a Visitor email', () => {
    const sut = Scheduling.create({
      visitorName: 'validName',
      visitorEmail: '',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidEmailError)
  })

  it('should not create a Scheduling Entity with a Visitor email invalid', () => {
    const invalidEmail = 'invalidmailmail.com'
    const sut = Scheduling.create({
      visitorName: 'validName',
      visitorEmail: invalidEmail,
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidEmailError(invalidEmail))
  })

  it('should not create a Scheduling Entity with a Visitor email invalid', () => {
    const invalidEmail = 'invalidmailmail.com'
    const sut = Scheduling.create({
      visitorName: 'validName',
      visitorEmail: invalidEmail,
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidEmailError(invalidEmail))
  })

  it('should not create a Scheduling Entity without a Establishment Name', () => {
    const sut = Scheduling.create({
      visitorName: 'invalidName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: '',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(InvalidNameError)
  })

  it('should not create a Scheduling Entity without a Establishment name invalid', () => {
    const invalidName = 'invalid_visitor name'
    const sut = Scheduling.create({
      visitorName: 'invalidName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: invalidName,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidNameError(invalidName))
  })

  it('should create a Scheduling Entity', () => {
    const sut = Scheduling.create({
      visitorName: 'validName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Scheduling)
  })
})
