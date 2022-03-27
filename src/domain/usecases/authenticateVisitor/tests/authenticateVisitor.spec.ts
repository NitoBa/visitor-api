import { InvalidParamError, MissingParamsError } from '../../../../shared/errors'
import { InMemoryGetVisitorByEmailRepository } from '../../tests/inMemoryGetVisitorByEmailRepositorySpy'
import { AuthenticateVisitor } from '../authenticateVisitor'
import { VisitorNotRegistered } from '../errors'
import { EncryptorSpy } from './encryptorSpy'
import { AuthenticateVisitorRepositorySpy } from './inMemoryAuthenticateVisitorRepository'

const makeEncryptor = (): EncryptorSpy => {
  return new EncryptorSpy()
}

const makeSut = (): {
  sut: AuthenticateVisitor
  authenticateVisitorRepositorySpy: AuthenticateVisitorRepositorySpy
  getVisitorByEmailRepository: InMemoryGetVisitorByEmailRepository
  encryptorSpy: EncryptorSpy
} => {
  const encryptorSpy = makeEncryptor()
  const getVisitorByEmailRepository = new InMemoryGetVisitorByEmailRepository()

  const authenticateVisitorRepositorySpy = new AuthenticateVisitorRepositorySpy()
  const sut = new AuthenticateVisitor(getVisitorByEmailRepository, authenticateVisitorRepositorySpy, encryptorSpy)
  return {
    sut,
    authenticateVisitorRepositorySpy,
    getVisitorByEmailRepository,
    encryptorSpy
  }
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
    const { sut, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })
    expect(getVisitorByEmailRepository.email).toBe(email)
  })

  it('should calls authenticateVisitorRepository with only once', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })
    expect(getVisitorByEmailRepository.callsCountExists).toBe(1)
  })

  it('should return an error if visitor is not registered', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, getVisitorByEmailRepository } = makeSut()
    getVisitorByEmailRepository.existsVisitor = false
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new VisitorNotRegistered())
  })

  it('should call Encryptor with correct parameters', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, encryptorSpy } = makeSut()
    await sut.execute({ email, password })
    expect(encryptorSpy.callsCount).toBe(1)
    expect(encryptorSpy.password).toBe(password)
  })

  it('should call Encryptor with correct parameters', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, encryptorSpy, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })
    expect(encryptorSpy.callsCount).toBe(1)
    expect(encryptorSpy.password).toBe(password)
    expect(encryptorSpy.hashedPassword).toBe(getVisitorByEmailRepository.visitor.password)
  })

  it('should return an error if password is incorrect', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, encryptorSpy } = makeSut()
    encryptorSpy.compare = jest.fn().mockReturnValueOnce(false)
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(password))
  })

//   it('should return a access token if visitor was authenticate with success', async () => {
//     const email = 'validemail@gmail.com'
//     const password = 'Test1234.'
//     const { sut } = makeSut()
//     const result = await sut.execute({ email, password })
//   })
})
