import { Either } from '../../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../../shared/errors'
import { EstablishmentData } from '../../entities'

export type GetAllAvailableEstablishmentsByTimeResponse = Either<MissingParamsError | InvalidParamError, EstablishmentData[]>
