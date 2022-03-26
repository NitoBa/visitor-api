import { Either, left, right } from '../../shared/either'
import { DomainError } from '../errors/domainError'
import { Email, Name, Password } from '../valueObjects'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../valueObjects/errors'

class MissingParamsError extends Error implements DomainError {
  constructor (public readonly params: string[]) {
    super(`Error: ${params.toString()} is missing`)
    this.name = 'MissingParamsError'
  }
}

class AlreadyExistsVisitorError extends Error implements DomainError {
  constructor (public readonly email: string) {
    super(`Error: the visitor with email "${email}" already exists`)
    this.name = 'AlreadyExistsError'
  }
}

interface VisitorRegisterData {
  name: string
  email: string
  password: string
}

type VisitorRegisterErrors = MissingParamsError | InvalidNameError | InvalidEmailError | InvalidPasswordError | AlreadyExistsVisitorError

type RegisterVisitorResponse = Either<VisitorRegisterErrors, void>

interface VisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<void>
}
interface RegisterVisitor {
  execute: (visitorRegisterData: VisitorRegisterData) => Promise<RegisterVisitorResponse>
}

class VisitorRepositorySpy implements VisitorRepository {
  email?: string
  name?: string
  password?: string
  output = false
  callsCountExists = 0
  callsCountRegister = 0
  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.output
  }

  async register (name: string, email: string, password: string): Promise<void> {
    this.name = name
    this.email = email
    this.password = password
    this.callsCountRegister++
  }
}

class RegisterNewVisitor implements RegisterVisitor {
  constructor (private readonly visitorRepository: VisitorRepository) {}

  async execute (visitorRegisterData: VisitorRegisterData): Promise<RegisterVisitorResponse> {
    const { name, email, password } = visitorRegisterData

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['name', 'email', 'password']))
    }

    if (!Email.validate(email)) {
      return left(new InvalidEmailError(email))
    }

    const isExists = await this.visitorRepository.existsByEmail(email)

    if (isExists) return left(new AlreadyExistsVisitorError(email))

    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }

    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }

    await this.visitorRepository.register(name, email, password)

    return right(undefined)
  }
}

const makeSut = (): {
  sut: RegisterVisitor
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
    expect(result.value).toEqual(new InvalidNameError(name))
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
    expect(result.value).toEqual(new InvalidEmailError(email))
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
    expect(result.value).toEqual(new InvalidPasswordError(password))
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
