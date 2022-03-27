import { Hour } from '../hour'

describe('Hour Validator', () => {
  it('should return an error if the hour is increase 23', () => {
    const sut = Hour.validate(24)
    expect(sut).toBeFalsy()
  })

  it('should return an error if the hour is smaller than 0', () => {
    const sut = Hour.validate(-1)
    expect(sut).toBeFalsy()
  })

  it('should return a valid hour', () => {
    const sut = Hour.validate(14)
    expect(sut).toBeTruthy()
  })
})
