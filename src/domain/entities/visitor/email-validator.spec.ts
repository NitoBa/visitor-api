import { Email } from './email'

describe('Email Validator', () => {
  it('should return an email if email is valid', () => {
    const isValidEmail = Email.validate('validemail@gmail.com')
    expect(isValidEmail).toBeTruthy()
  })
})
