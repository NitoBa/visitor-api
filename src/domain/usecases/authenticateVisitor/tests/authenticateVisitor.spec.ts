import { Either, left, right } from '../../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../errors'
import { Email, Password } from '../../../valueObjects'
import { VisitorNotRegistered } from '../errors'

type AuthenticateVisitorErrors = InvalidParamError | VisitorNotRegistered | MissingParamsError

type AuthenticateVisitorResponse= Either<AuthenticateVisitorErrors, void>

interface IAuthenticateVisitor {
  execute: (params: AuthenticateVisitorData) => Promise<AuthenticateVisitorResponse>
}

interface AuthenticateVisitorData {
  email: string
  password: string
}

interface IAuthenticateVisitorRepository {
  existsByEmail: (email: string) => Promise<boolean>
}

class AuthenticateVisitorRepositorySpy implements IAuthenticateVisitorRepository {
  callsCountExists = 0
  email?: string
  output = false
  async existsByEmail (email: string): Promise<boolean> {
    this.email = email
    this.callsCountExists++
    return this.output
  }
}

class AuthenticateVisitor implements IAuthenticateVisitor {
  constructor (private readonly authenticateVisitorRepository: IAuthenticateVisitorRepository) {}
  async execute (input: AuthenticateVisitorData): Promise<AuthenticateVisitorResponse> {
    const { email, password } = input
    if (email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))
    if (!Password.validate(password)) return left(new InvalidParamError(password))

    const isExists = await this.authenticateVisitorRepository.existsByEmail(email)
    if (!isExists) return left(new VisitorNotRegistered())
    return right(undefined)
  }
}

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
})
