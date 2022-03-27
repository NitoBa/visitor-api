import { Either } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { Establishment } from '../../entities'

export type GetAllAvailableEstablishmentsByTimeResponse = Either<MissingParamsError | InvalidParamError, Establishment[]>
