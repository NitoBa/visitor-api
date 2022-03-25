import { Email } from './email'

describe('Email Validator', () => {
  it('should return true if email is valid', () => {
    const isValidEmail = Email.validate('validemail@gmail.com')
    expect(isValidEmail).toBeTruthy()
  })

  it('should return false if email is invalid without port', () => {
    const isValidEmail = Email.validate('email@gmail')
    expect(isValidEmail).toBeFalsy()
  })

  it('should return false if email is invalid without @', () => {
    const isValidEmail = Email.validate('emailgmail.com')
    expect(isValidEmail).toBeFalsy()
  })

  it('should return false if email is bigger', () => {
    const emailInvalid = 'a'.repeat(256)
    const isValidEmail = Email.validate(`${emailInvalid}@gmail.com`)
    expect(isValidEmail).toBeFalsy()
  })

  it('should return false if email is too small', () => {
    const isValidEmail = Email.validate('add@gmail.com')
    expect(isValidEmail).toBeFalsy()
  })

  it('should return false if email is empty', () => {
    const isValidEmail = Email.validate('')
    expect(isValidEmail).toBeFalsy()
  })
})
