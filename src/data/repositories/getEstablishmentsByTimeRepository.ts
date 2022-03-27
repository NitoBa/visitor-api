import { EstablishmentData } from '@/domain/entities'

export interface IGetEstablishmentsByTimeRepository {
  getAllByTime: (input: {openHour: number, closedHour: number}) => Promise<EstablishmentData[]>
}
