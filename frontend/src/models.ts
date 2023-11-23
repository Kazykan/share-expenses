export interface IProduct {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface ITelegramUser {
  id?: number
  telegram_user_id: number
  username: string
}

export interface IPlace {
  id?: number
  name: string
  telegram_user_id: number
}

export interface IUser {
  id?: number
  username: string
  id_telegram: number
  place: number
}

export interface IExpense {
  id?: number
  name: string
  cost: number
  date: string
  who_paid_user: number
  place: number
}

export interface IMoneyTransfer {
  id?: number
  amount: number
  date: string
  who_paid_user: number
  who_gets_user: number
  place: number
}
