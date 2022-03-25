import { Name } from './name'

describe('Name Validator', () => {
  it('should return true if name is valid', () => {
    const sut = Name.validate('validname')
    expect(sut).toBeTruthy()
  })

  it('should return false if name is empty', () => {
    const sut = Name.validate('')
    expect(sut).toBeFalsy()
  })

  it('should return false if name is small', () => {
    const sut = Name.validate('0000')
    expect(sut).toBeFalsy()
  })

  it('should return false if name contains numbers', () => {
    const sut = Name.validate('validname001')
    expect(sut).toBeFalsy()
  })

  it('should return false if name contains special characters', () => {
    const sut = Name.validate('&_9%-!*()=+@')
    expect(sut).toBeFalsy()
  })

  it('should return false if name is so bigger', () => {
    const sut = Name.validate('d'.repeat(256))
    expect(sut).toBeFalsy()
  })
})
