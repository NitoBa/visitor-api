import { IGetEstablishmentByIdRepository } from '@/data/repositories'
import { EstablishmentData } from '@/domain/entities'

export class GetEstablishmentByIdRepositorySpy implements IGetEstablishmentByIdRepository {
  callsCount = 0
  id: string = ''
  establishments: EstablishmentData[] = []
  async getEstablishmentById (id: string): Promise<EstablishmentData | undefined> {
    this.callsCount++
    this.id = id
    return this.establishments.find(establishment => establishment.id === id)
  }
}
