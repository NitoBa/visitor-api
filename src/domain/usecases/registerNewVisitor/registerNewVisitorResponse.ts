import { Either } from '../../../shared/either'
import { AlreadyExistsVisitorError, InvalidParamError, MissingParamsError } from './errors'

type VisitorRegisterErrors = MissingParamsError | InvalidParamError | AlreadyExistsVisitorError

export type RegisterNewVisitorResponse = Either<VisitorRegisterErrors, void>
