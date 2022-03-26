import { Either } from '../../../shared/either'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../valueObjects/errors'
import { AlreadyExistsVisitorError, MissingParamsError } from './errors'

type VisitorRegisterErrors = MissingParamsError | InvalidNameError | InvalidEmailError | InvalidPasswordError | AlreadyExistsVisitorError

export type RegisterVisitorResponse = Either<VisitorRegisterErrors, void>
