export class Name {
  private constructor (private readonly name: string) {}

  get value (): string {
    return this.name
  }

  static validate (name: string): boolean {
    const tester = /^[^0-9A-Z?,.!$#%*@&_¨()+=-]+$/

    if (name.length === 0 || name.trim().length < 5 || name.trim().length > 255) {
      return false
    }

    if (!tester.test(name)) {
      return false
    }
    return true
  }
}
