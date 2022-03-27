import { InvalidParamError, MissingParamsError } from '../../../../shared/errors'
import { EncryptorSpy, InMemoryGetVisitorByEmailRepository, VisitorRepositorySpy } from '../../../../shared/mocks'
import { AlreadyExistsVisitorError } from '../errors'
import { RegisterNewVisitor } from '../registerNewVisitor'

const makeEncryptor = (): EncryptorSpy => {
  return new EncryptorSpy()
}
const makeSut = (): {
  sut: RegisterNewVisitor
  visitorRepository: VisitorRepositorySpy
  getVisitorByEmailRepository: InMemoryGetVisitorByEmailRepository
  encryptorSpy: EncryptorSpy

} => {
  const encryptorSpy = makeEncryptor()

  const visitorRepository = new VisitorRepositorySpy()
  const getVisitorByEmailRepository = new InMemoryGetVisitorByEmailRepository(false)
  const sut = new RegisterNewVisitor({
    getVisitorByEmailRepository,
    registerVisitorRepository: visitorRepository,
    encryptorRepository: encryptorSpy
  })

  return {
    sut,
    visitorRepository,
    getVisitorByEmailRepository,
    encryptorSpy
  }
}

describe('Register New Visitor', () => {
  it('should not register a visitor without params', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      name: '',
      email: '',
      password: ''
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new MissingParamsError(['name', 'email', 'password']))
  })

  it('should not register a visitor with invalid name', async () => {
    const name = 'invalid_name09123'
    const { sut } = makeSut()
    const result = await sut.execute({
      name,
      email: 'validemail@gmail.com',
      password: 'validpassword'
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(name))
  })

  it('should not register a visitor with invalid email', async () => {
    const email = 'invalidemail'
    const { sut } = makeSut()
    const result = await sut.execute({
      email,
      name: 'validname',
      password: 'validpassword'
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(email))
  })

  it('should not register a visitor with invalid password', async () => {
    const password = 'invalidpassword'
    const { sut } = makeSut()
    const result = await sut.execute({
      name: 'validName',
      email: 'validemail@gmail.com',
      password
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(password))
  })

  it('should calls exists on visitor repository with correct email', async () => {
    const email = 'validemail@gmail.com'

    const { sut, getVisitorByEmailRepository } = makeSut()
    getVisitorByEmailRepository.email = email
    await sut.execute({
      email,
      name: 'validName',
      password: 'valid_Password123'
    })
    expect(getVisitorByEmailRepository.callsCountExists).toBe(1)
    expect(getVisitorByEmailRepository.email).toBe(email)
  })

  it('should not register a visitor if already registered', async () => {
    const email = 'validemail@gmail.com'

    const { sut, getVisitorByEmailRepository } = makeSut()

    getVisitorByEmailRepository.existsVisitor = true

    const result = await sut.execute({
      email,
      name: 'validName',
      password: 'valid_Password123'
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new AlreadyExistsVisitorError(email))
  })

  it('should call Encryptor with correct parameters', async () => {
    const name = 'validName'
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, encryptorSpy } = makeSut()
    await sut.execute({ name, email, password })
    expect(encryptorSpy.callsCount).toBe(1)
    expect(encryptorSpy.password).toBe(password)
  })

  it('should return a password encrypted when call encrypt method', async () => {
    const name = 'validName'
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, encryptorSpy } = makeSut()
    await sut.execute({ name, email, password })
    expect(encryptorSpy.hashedPassword).not.toBe(password)
  })

  it('should calls register on get visitor by email repository with correct params', async () => {
    const email = 'validemail@gmail.com'
    const name = 'validName'
    const password = 'valid_Password123'

    const { sut, visitorRepository, encryptorSpy } = makeSut()
    visitorRepository.email = email
    visitorRepository.name = name
    visitorRepository.password = password

    await sut.execute({ name, email, password })

    expect(visitorRepository.callsCountRegister).toBe(1)
    expect(visitorRepository.name).toBe(name)
    expect(visitorRepository.email).toBe(email)
    expect(visitorRepository.password).toBe(encryptorSpy.hashedPassword)
  })

  it('should a new visitor and return void', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({
      email: 'valid@gmail.com',
      name: 'validName',
      password: 'valid_Password123'
    })
    expect(result.isRight).toBeTruthy()
    expect(result.value).toBeUndefined()
  })
})
