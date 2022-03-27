import { Establishment } from '@/domain/entities'
import { Either } from '@/shared/either'
import { InvalidParamError, MissingParamsError, NotFoundError } from '@/shared/errors'

type GetEstablishmentByIdErrors = InvalidParamError | MissingParamsError | NotFoundError

export type GetEstablishmentByIdResponse = Either<GetEstablishmentByIdErrors, Establishment>
