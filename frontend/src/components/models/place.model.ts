import { TelegramUser } from "./telegramuser.model"


export interface Place {
  id?: number
  name: string
  telegram_user_id: TelegramUser
}
