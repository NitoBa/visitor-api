import { GetEstablishmentByIdResponse } from './getEstablishmentByIdResponse'

export interface IGetEstablishmentByIdInput {
  execute: (id: string) => Promise<GetEstablishmentByIdResponse>
}
