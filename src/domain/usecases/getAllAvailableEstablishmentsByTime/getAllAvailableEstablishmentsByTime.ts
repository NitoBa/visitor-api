import { GetAllAvailableEstablishmentsByTimeData } from './getAllAvailableEstablishmentsByTimeData'
import { GetAllAvailableEstablishmentsByTimeResponse } from './getAllAvailableEstablishmentsByTimeResponse'
export interface IGetAllAvailableEstablishmentsByTime {
  execute: (input: GetAllAvailableEstablishmentsByTimeData) => Promise<GetAllAvailableEstablishmentsByTimeResponse>
}
