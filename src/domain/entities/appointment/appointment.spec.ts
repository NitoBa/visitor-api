import { InvalidParamError } from '@/shared/errors'
import { randomUUID } from 'crypto'
import { Appointment } from './appointment'

describe('Appointment Domain Entity', () => {
  it('should not create a Appointment Entity without a Visitor ID', () => {
    const visitorId = ''
    const sut = Appointment.create({
      id: randomUUID(),
      visitorId,
      establishmentId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(visitorId))
  })

  it('should not create a Appointment Entity without a Establishment id', () => {
    const establishmentId = ''
    const sut = Appointment.create({
      id: randomUUID(),
      visitorId: randomUUID(),
      establishmentId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(establishmentId))
  })

  it('should not create a Appointment Entity without id', () => {
    const id = ''
    const sut = Appointment.create({
      id,
      visitorId: randomUUID(),
      establishmentId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(id))
  })

  it('should create a Appointment Entity', () => {
    const sut = Appointment.create({
      id: randomUUID(),
      visitorId: randomUUID(),
      establishmentId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Appointment)
  })
})
