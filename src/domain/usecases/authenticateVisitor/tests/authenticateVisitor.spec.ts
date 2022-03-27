import { Either, left, right } from '../../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../errors'
import { Email, Password } from '../../../valueObjects'

type AuthenticateVisitorResponse= Either<InvalidParamError | MissingParamsError, void>

interface AuthenticateUsecase {
  execute: (params: AuthenticateVisitorData) => Promise<AuthenticateVisitorResponse>
}

interface AuthenticateVisitorData {
  email: string
  password: string
}

class AuthenticateVisitor implements AuthenticateUsecase {
  async execute (input: AuthenticateVisitorData): Promise<AuthenticateVisitorResponse> {
    const { email, password } = input
    if (email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))
    if (!Password.validate(password)) return left(new InvalidParamError(password))
    return right(undefined)
  }
}

const makeSut = (): { sut: AuthenticateVisitor } => {
  const sut = new AuthenticateVisitor()
  return { sut }
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
    const email = 'invalid@gmail.com'
    const password = 'invalid_password'
    const { sut } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidParamError(password))
  })
})
