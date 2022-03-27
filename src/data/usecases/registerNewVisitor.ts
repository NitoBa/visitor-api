
import { RegisterNewVisitorResponse, RegisterVisitor, VisitorRegisterData } from '@/domain/usecases'
import { AlreadyExistsVisitorError } from '@/domain/usecases/registerNewVisitor/errors'
import { left, right } from '@/shared/either'
import { InvalidParamError, MissingParamsError } from '@/shared/errors'
import { Email, Name, Password } from '@/shared/validators'
import { IEncryptorRepository, IGetVisitorByEmailRepository, IRegisterVisitorRepository } from '../repositories'

export interface RegisterVisitorDeps {
  registerVisitorRepository: IRegisterVisitorRepository
  encryptorRepository: IEncryptorRepository
  getVisitorByEmailRepository: IGetVisitorByEmailRepository
}

export class RegisterNewVisitor implements RegisterVisitor {
  constructor (
    private readonly deps: RegisterVisitorDeps
  ) {}

  async execute (visitorRegisterData: VisitorRegisterData): Promise<RegisterNewVisitorResponse> {
    const {
      encryptorRepository,
      getVisitorByEmailRepository,
      registerVisitorRepository
    } = this.deps

    const { name, email, password } = visitorRegisterData

    if (name.length === 0 && email.length === 0 && password.length === 0) {
      return left(new MissingParamsError(['name', 'email', 'password']))
    }

    if (!Email.validate(email)) return left(new InvalidParamError(email))

    const isExists = await getVisitorByEmailRepository.existsByEmail(email)

    if (isExists) return left(new AlreadyExistsVisitorError(email))

    if (!Name.validate(name)) return left(new InvalidParamError(name))

    if (!Password.validate(password)) return left(new InvalidParamError(password))

    const encryptedPassword = encryptorRepository.encrypt(password)

    await registerVisitorRepository.register({ name, email, password: encryptedPassword })

    return right(undefined)
  }
}
