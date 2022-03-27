import { InvalidParamError } from '../../../shared/errors'
import { Password } from '../password'

describe('Password Validator', () => {
  it('should return false if password is empty', () => {
    const password = ''
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password is less than 6 characters', () => {
    const password = 'a'.repeat(4)
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password is more than 20 characters', () => {
    const password = 'a'.repeat(21)
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password no contains uppercase letters', () => {
    const password = 'onlylowercase'
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password no contains lowercase letters', () => {
    const password = 'ONLYUPPERCASE'
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password no contains numbers', () => {
    const password = 'ONLYLetters'
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return false if password no contains special characters', () => {
    const password = 'whioutNUMBERS123'
    const sut = Password.create(password)

    expect(sut.isLeft()).toBeTruthy()
    expect(sut.value).toEqual(new InvalidParamError(password))
  })

  it('should return true if password is valid', () => {
    const password = 'valid_Password123'
    const sut = Password.create(password)

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeTruthy()
  })
})
