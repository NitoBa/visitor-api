import { DateObject } from '../date'

describe('Date Validator', () => {
  it('should return false if day of date is invalid', () => {
    const sut = DateObject.validate('32/10/2021')

    expect(sut).toBeFalsy()
  })

  it('should return false if month of date is invalid', () => {
    const sut = DateObject.validate('03/16/2021')

    expect(sut).toBeFalsy()
  })

  it('should return false if year of date is invalid', () => {
    const sut = DateObject.validate('03/11/202')

    expect(sut).toBeFalsy()
  })

  it('should return false if date not provide with correct format', () => {
    const sut = DateObject.validate('03-11-2021')

    expect(sut).toBeFalsy()
  })

  it('should return true if date contain correct format', () => {
    const sut = DateObject.validate('03/11/2021')

    expect(sut).toBeTruthy()
  })
})
