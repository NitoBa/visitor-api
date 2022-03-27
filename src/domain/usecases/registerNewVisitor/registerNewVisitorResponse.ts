import { Either } from '../../../shared/either'
import { InvalidParamError } from '../../errors'
import { AlreadyExistsVisitorError, MissingParamsError } from './errors'

type VisitorRegisterErrors = MissingParamsError | InvalidParamError | AlreadyExistsVisitorError

export type RegisterNewVisitorResponse = Either<VisitorRegisterErrors, void>
