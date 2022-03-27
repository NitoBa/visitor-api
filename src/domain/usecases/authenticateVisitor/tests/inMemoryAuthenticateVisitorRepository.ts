/* eslint-disable @typescript-eslint/semi */
import { IAuthenticateVisitorRepository } from '../../../repositories';

export class AuthenticateVisitorRepositorySpy implements IAuthenticateVisitorRepository {
  async authenticate (input: { email: string, password: string }): Promise<void> {

  }
}
