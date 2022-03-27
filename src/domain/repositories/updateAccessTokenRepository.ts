export interface IUpdateAccessTokenRepository {
  update: (accessToken: string) => Promise<void>
}
