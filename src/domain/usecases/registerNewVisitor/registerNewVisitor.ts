import { RegisterNewVisitorResponse } from './registerNewVisitorResponse'
import { VisitorRegisterData } from './visitorRegisterData'

export interface RegisterVisitor {
  execute: (visitorRegisterData: VisitorRegisterData) => Promise<RegisterNewVisitorResponse>
}
