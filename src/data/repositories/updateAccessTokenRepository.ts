export interface IUpdateAccessTokenRepository {
  update: (input: { accessToken: string, userId: string }) => Promise<void>
}
