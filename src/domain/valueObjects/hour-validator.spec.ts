import { Hour } from './hour'

describe('Hour Validator', () => {
  it('should return an error if the hour is increase 23', () => {
    const sut = Hour.create(24)
    expect(sut.isLeft()).toBeTruthy()
  })

  it('should return an error if the hour is smaller than 0', () => {
    const sut = Hour.create(-1)
    expect(sut.isLeft()).toBeTruthy()
  })
})
