import { Either } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { VisitorNotRegistered } from './errors'

type AuthenticateVisitorErrors = InvalidParamError | VisitorNotRegistered | MissingParamsError

export type AuthenticateVisitorResponse= Either<AuthenticateVisitorErrors, void>
