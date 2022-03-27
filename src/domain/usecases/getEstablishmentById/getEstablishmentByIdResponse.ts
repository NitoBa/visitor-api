import { Establishment } from '@/domain/entities'
import { Either } from '@/shared/either'
import { InvalidParamError, MissingParamsError } from '@/shared/errors'

type GetEstablishmentByIdErrors = InvalidParamError | MissingParamsError

export type GetEstablishmentByIdResponse = Either<GetEstablishmentByIdErrors, Establishment>
