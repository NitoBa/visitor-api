import { VisitorNotRegistered } from '../../../domain/usecases/authenticateVisitor/errors'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { EncryptorSpy, InMemoryGetVisitorByEmailRepository, TokenGeneratorRepositorySpy, UpdateAccessTokenRepositorySpy } from '../../../shared/mocks'
import { AuthenticateVisitor } from '../authenticateVisitor'

const makeUpdateAccessToken = (): UpdateAccessTokenRepositorySpy => {
  return new UpdateAccessTokenRepositorySpy()
}

const makeTokenGenerator = (): TokenGeneratorRepositorySpy => {
  return new TokenGeneratorRepositorySpy()
}

const makeEncryptor = (): EncryptorSpy => {
  return new EncryptorSpy()
}

const makeSut = (): {
  sut: AuthenticateVisitor
  getVisitorByEmailRepository: InMemoryGetVisitorByEmailRepository
  encryptorSpy: EncryptorSpy
  tokenGeneratorSpy: TokenGeneratorRepositorySpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
} => {
  const updateAccessTokenRepositorySpy = makeUpdateAccessToken()
  const tokenGeneratorSpy = makeTokenGenerator()
  const encryptorSpy = makeEncryptor()
  const getVisitorByEmailRepository = new InMemoryGetVisitorByEmailRepository()

  const sut = new AuthenticateVisitor({
    getVisitorByEmailRepository,
    encryptorRepository: encryptorSpy,
    tokenGeneratorRepository: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy
  })
  return {
    sut,
    getVisitorByEmailRepository,
    encryptorSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
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

  it('should call token generator with correct parameters', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, tokenGeneratorSpy, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })
    expect(tokenGeneratorSpy.callsCount).toBe(1)
    expect(tokenGeneratorSpy.id).toBe(getVisitorByEmailRepository.visitor.id)
  })

  it('should call updateAccessTokenRepository with correct parameters', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, updateAccessTokenRepositorySpy, tokenGeneratorSpy, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })

    const accessToken = tokenGeneratorSpy.generatedToken
    const userId = getVisitorByEmailRepository.visitor.id

    expect(updateAccessTokenRepositorySpy.callsCount).toBe(1)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(accessToken)
    expect(updateAccessTokenRepositorySpy.userId).toBe(userId)
  })

  it('should not throw an error updateAccessTokenRepository update was called', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, updateAccessTokenRepositorySpy, tokenGeneratorSpy, getVisitorByEmailRepository } = makeSut()
    await sut.execute({ email, password })

    const accessToken = tokenGeneratorSpy.generatedToken
    const userId = getVisitorByEmailRepository.visitor.id

    expect(await updateAccessTokenRepositorySpy.update({ accessToken, userId })).toBeUndefined()
  })

  it('should return an access token if visitor was authenticate with success', async () => {
    const email = 'validemail@gmail.com'
    const password = 'Test1234.'
    const { sut, tokenGeneratorSpy } = makeSut()
    const result = await sut.execute({ email, password })
    expect(result.isRight).toBeTruthy()
    expect(result.value).toBe(tokenGeneratorSpy.generatedToken)
  })
})
