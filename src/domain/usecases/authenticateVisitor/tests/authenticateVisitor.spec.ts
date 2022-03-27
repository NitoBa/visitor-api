import { InvalidParamError, MissingParamsError } from '../../../errors'
import { AuthenticateVisitor } from '../authenticateVisitor'
import { VisitorNotRegistered } from '../errors'
import { AuthenticateVisitorRepositorySpy } from './inMemoryAuthenticateVisitorRepository'

const makeSut = (): {
  sut: AuthenticateVisitor
  authenticateVisitorRepositorySpy: AuthenticateVisitorRepositorySpy
} => {
  const authenticateVisitorRepositorySpy = new AuthenticateVisitorRepositorySpy()
  const sut = new AuthenticateVisitor(authenticateVisitorRepositorySpy)
  return { sut, authenticateVisitorRepositorySpy }
}

describe('Authenticate a visitor', () => {
  it('should return an error if is missing email and password', async () => {
    const email = ''
    const password = ''
    const { sut } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new MissingParamsError(['email', 'password']))
  })

  it('should return an error if email is invalid', async () => {
    const email = 'invalid_email'
    const password = 'Test1234.'
    const { sut } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(email))
  })

  it('should return an error if password is invalid', async () => {
    const email = 'validemail@gmail.com'
    const password = 'invalid_password'
    const { sut } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(password))
  })

  it('should calls authenticateVisitorRepository with correct parameters', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, authenticateVisitorRepositorySpy } = makeSut()
    await sut.execute({ email, password })
    expect(authenticateVisitorRepositorySpy.email).toBe(email)
  })

  it('should calls authenticateVisitorRepository with only once', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, authenticateVisitorRepositorySpy } = makeSut()
    await sut.execute({ email, password })
    expect(authenticateVisitorRepositorySpy.callsCountExists).toBe(1)
  })

  it('should return an error if visitor is not registered', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new VisitorNotRegistered())
  })

//   it('should return a access token if visitor was authenticate with success', async () => {
//     const email = 'validemail@gmail.com'
//     const password = 'Test1234.'
//     const { sut } = makeSut()
//     const result = await sut.execute({ email, password })
//   })
})
