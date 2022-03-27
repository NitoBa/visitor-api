import { EstablishmentData } from '@/domain/entities'

export interface IGetEstablishmentByIdRepository {
  getEstablishmentById: (id: string) => Promise<EstablishmentData | undefined>
}
