import { randomUUID } from 'crypto'
import { InvalidParamError } from '../../../shared/errors'
import { Scheduling } from './scheduling'

describe('Scheduling Domain Entity', () => {
  it('should not create a Scheduling Entity without a Visitor Name', () => {
    const name = ''
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: name,
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(name))
  })

  it('should not create a Scheduling Entity without a Visitor Name Invalid', () => {
    const invalidName = 'invalid_visitor name'
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: invalidName,
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(invalidName))
  })

  it('should not create a Scheduling Entity without a Visitor email', () => {
    const email = ''
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: 'validName',
      visitorEmail: email,
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(email))
  })

  it('should not create a Scheduling Entity with a Visitor email invalid', () => {
    const invalidEmail = 'invalidmailmail.com'
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: 'validName',
      visitorEmail: invalidEmail,
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(invalidEmail))
  })

  it('should not create a Scheduling Entity with a Visitor email invalid', () => {
    const invalidEmail = 'invalidmailmail.com'
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: 'validName',
      visitorEmail: invalidEmail,
      establishmentName: 'EstablishmentName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(invalidEmail))
  })

  it('should not create a Scheduling Entity without a Establishment Name', () => {
    const name = ''
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: 'invalidName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: name,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(name))
  })

  it('should not create a Scheduling Entity without a Establishment name invalid', () => {
    const invalidName = 'invalid_visitor name'
    const sut = Scheduling.create({
      id: randomUUID(),
      visitorName: 'invalidName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: invalidName,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(invalidName))
  })

  it('should not create a Scheduling Entity without id', () => {
    const id = ''
    const sut = Scheduling.create({
      id,
      visitorName: 'validName',
      visitorEmail: 'visitormail@gmail.com',
      establishmentName: 'validName',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(id))
  })

  it('should create a Scheduling Entity', () => {
    const sut = Scheduling.create({
      id: randomUUID(),
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
