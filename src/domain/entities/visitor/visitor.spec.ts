import { Visitor } from './visitor'

describe('Visitor Domain Entity', () => {
  it('should not create a visitor with invalid email', () => {
    const sut = Visitor.create({ name: 'nameValid', email: 'invalidEmail' })

    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a visitor with invalid email empty', () => {
    const sut = Visitor.create({ name: 'nameValid', email: '' })

    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a visitor with invalid name', () => {
    const sut = Visitor.create({ name: 'not_valid_name', email: 'validemail@gmail.com' })

    expect(sut.isLeft()).toBeTruthy()
  })

  it('should not create a visitor with invalid empty', () => {
    const sut = Visitor.create({ name: '', email: 'validemail@gmail.com' })

    expect(sut.isLeft()).toBeTruthy()
  })
})
