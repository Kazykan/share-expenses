import { Place } from "./place.model"
import { User } from "./user.model"

export interface MoneyTransfer {
  id?: number
  amount: number
  date: string
  who_paid_user: number
  who_gets_user: number
  place: Place
}
