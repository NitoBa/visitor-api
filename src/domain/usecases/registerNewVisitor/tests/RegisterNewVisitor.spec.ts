import { InvalidParamError } from '../../../errors'
import { AlreadyExistsVisitorError, MissingParamsError } from '../errors'
import { RegisterNewVisitor } from '../registerNewVisitor'
import { VisitorRepositorySpy } from './InMemoryRegisterVisitorRepository'

const makeSut = (): {
  sut: RegisterNewVisitor
  visitorRepository: VisitorRepositorySpy
} => {
  const visitorRepository = new VisitorRepositorySpy()
  const sut = new RegisterNewVisitor(visitorRepository)

  return { sut, visitorRepository }
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

    const { sut, visitorRepository } = makeSut()
    visitorRepository.email = email
    await sut.execute({
      email,
      name: 'validName',
      password: 'valid_Password123'
    })
    expect(visitorRepository.callsCountExists).toBe(1)
    expect(visitorRepository.email).toBe(email)
  })

  it('should calls register on visitor repository with correct params', async () => {
    const email = 'validemail@gmail.com'
    const name = 'validName'
    const password = 'valid_Password123'

    const { sut, visitorRepository } = makeSut()
    visitorRepository.email = email
    visitorRepository.name = name
    visitorRepository.password = password

    await sut.execute({ name, email, password })

    expect(visitorRepository.callsCountRegister).toBe(1)
    expect(visitorRepository.name).toBe(name)
    expect(visitorRepository.email).toBe(email)
    expect(visitorRepository.password).toBe(password)
  })

  it('should not register a visitor if already registered', async () => {
    const email = 'validemail@gmail.com'

    const { sut, visitorRepository } = makeSut()

    visitorRepository.output = true

    const result = await sut.execute({
      email,
      name: 'validName',
      password: 'valid_Password123'
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new AlreadyExistsVisitorError(email))
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
