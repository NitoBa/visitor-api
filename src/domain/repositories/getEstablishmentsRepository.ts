import { EstablishmentData } from '../entities'

export interface IGetEstablishmentsRepository {
  getAllByTime: (input: {openHour: number, closedHour: number}) => Promise<EstablishmentData[]>
}
