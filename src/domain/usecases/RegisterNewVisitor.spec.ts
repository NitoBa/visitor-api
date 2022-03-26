import { Either, left, right } from '../../shared/either'
import { Visitor } from '../entities'
import { DomainError } from '../errors/domainError'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../valueObjects/errors'

class MissingParamsError extends Error implements DomainError {
  constructor (public readonly params: string[]) {
    super(`Error: ${params.toString()} is missing`)
    this.name = 'MissingParamsError'
  }
}

interface VisitorRegisterData {
  name: string
  email: string
  password: string
}

type RegisterVisitorResponse = Either<
MissingParamsError |
InvalidNameError |
InvalidEmailError |
InvalidPasswordError, void>

interface RegisterVisitor {
  execute: (visitorRegisterData: VisitorRegisterData) => Promise<RegisterVisitorResponse>
}

class RegisterNewVisitor implements RegisterVisitor {
  async execute (visitorRegisterData: VisitorRegisterData): Promise<RegisterVisitorResponse> {
    const { name, email, password } = visitorRegisterData

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['name', 'email', 'password']))
    }

    const visitorOrError = Visitor.create({ name, email })

    // return invalid name or invalid email if true
    if (visitorOrError.isLeft()) {
      return left(visitorOrError.value)
    }

    return right(undefined)
  }
}

const makeSut = (): { sut: RegisterVisitor } => {
  const sut = new RegisterNewVisitor()

  return { sut }
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
      name: 'validName',
      email,
      password: 'validpassword'
    })
    expect(result.isLeft).toBeTruthy()
    expect(result.value).toEqual(new InvalidEmailError(email))
  })

//   it('should not register a visitor with invalid password', async () => {
//     const password = 'invalidpassword'
//     const { sut } = makeSut()
//     const result = await sut.execute({
//       name: 'validName',
//       email: 'validemail@gmail.com',
//       password
//     })
//     expect(result.isLeft).toBeTruthy()
//     expect(result.value).toEqual(new InvalidPasswordError(password))
//   })
})
