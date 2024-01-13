export interface MoneyTransfer {
  id?: number
  amount: number
  date: string
  who_paid_member_id: number
  who_got_member_id: number
  place_id: number
}
