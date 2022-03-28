export abstract class Entity<T> {
  protected _props?: T

  constructor (props: T) {
    this._props = props
  }
}
