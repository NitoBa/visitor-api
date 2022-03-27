import { Establishment } from '../../domain/entities'
import { IGetAllAvailableEstablishmentsByTime } from '../../domain/usecases/getAllAvailableEstablishmentsByTime/getAllAvailableEstablishmentsByTime'
import { GetAllAvailableEstablishmentsByTimeData } from '../../domain/usecases/getAllAvailableEstablishmentsByTime/getAllAvailableEstablishmentsByTimeData'
import { GetAllAvailableEstablishmentsByTimeResponse } from '../../domain/usecases/getAllAvailableEstablishmentsByTime/getAllAvailableEstablishmentsByTimeResponse'
import { left, right } from '../../shared/either'
import { InvalidParamError, MissingParamsError } from '../../shared/errors'
import { Hour } from '../../shared/validators'
import { IGetEstablishmentsRepository } from '../repositories'

export class GetAllAvailableEstablishmentsByTime implements IGetAllAvailableEstablishmentsByTime {
  constructor (private readonly getEstablishmentsRepository: IGetEstablishmentsRepository) {}

  async execute (input: GetAllAvailableEstablishmentsByTimeData): Promise<GetAllAvailableEstablishmentsByTimeResponse> {
    if (input === undefined || input === null) {
      return left(new MissingParamsError(['openHour', 'closedHour']))
    }
    const { openHour, closedHour } = input

    if (!Hour.validate(openHour)) return left(new InvalidParamError(openHour.toString()))
    if (!Hour.validate(closedHour)) return left(new InvalidParamError(closedHour.toString()))

    const establishmentsResult = await this.getEstablishmentsRepository.getAllByTime({ openHour, closedHour })

    const data = establishmentsResult.map(establishment => Establishment.create(establishment).value as Establishment)

    return right(data)
  }
}
