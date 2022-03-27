import { Establishment } from '@/domain/entities'
import { Either } from '@/shared/either'
import { InvalidParamError, MissingParamsError } from '@/shared/errors'

export type GetAllAvailableEstablishmentsByTimeResponse = Either<MissingParamsError | InvalidParamError, Establishment[]>
