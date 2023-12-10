import { Place } from "./place.model"
import { User } from "./user.model"

export interface Expense {
  id?: number
  name: string
  cost: number
  date: Date
  who_paid_user: User
  place: Place
}
