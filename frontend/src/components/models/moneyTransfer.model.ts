import { Place } from "./place.model"
import { User } from "./user.model"

export interface MoneyTransfer {
  id?: number
  amount: number
  date: Date
  who_paid_user: User
  who_gets_user: User
  place: Place
}
