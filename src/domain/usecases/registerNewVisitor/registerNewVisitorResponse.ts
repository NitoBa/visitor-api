import { Either } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { AlreadyExistsVisitorError } from './errors'

type VisitorRegisterErrors = MissingParamsError | InvalidParamError | AlreadyExistsVisitorError

export type RegisterNewVisitorResponse = Either<VisitorRegisterErrors, void>
