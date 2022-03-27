import { GetEstablishmentByIdResponse } from './getEstablishmentByIdResponse'

export interface IGetEstablishmentById {
  execute: (id: string) => Promise<GetEstablishmentByIdResponse>
}
