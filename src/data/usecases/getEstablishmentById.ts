import { Establishment } from '@/domain/entities'
import { GetEstablishmentByIdResponse, IGetEstablishmentById } from '@/domain/usecases'
import { left, right } from '@/shared/either'
import { InvalidParamError, MissingParamsError, NotFoundError } from '@/shared/errors'
import { ID } from '@/shared/validators'
import { IGetEstablishmentByIdRepository } from '../repositories'

export class GetEstablishmentById implements IGetEstablishmentById {
  constructor (private readonly getEstablishmentByIdRepository: IGetEstablishmentByIdRepository) {}
  async execute (id: string): Promise<GetEstablishmentByIdResponse> {
    if (id.length === 0) return left(new MissingParamsError(['id']))

    if (!ID.validate(id)) return left(new InvalidParamError(id))

    const establishment = await this.getEstablishmentByIdRepository.getEstablishmentById(id)

    if (establishment === undefined) return left(new NotFoundError(id))

    return right(Establishment.create(establishment).value as Establishment)
  }
}
