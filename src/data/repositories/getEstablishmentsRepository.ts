import { EstablishmentData } from '../../domain/entities'

export interface IGetEstablishmentsRepository {
  getAllByTime: (input: {openHour: number, closedHour: number}) => Promise<EstablishmentData[]>
}
