import { TelegramUser } from "../components/models/telegramuser.model"
import { axiosInstance } from "./api"

export const TUserService = {
  async get(IdTelegramApp: number | undefined) {
    if (IdTelegramApp === undefined) return []

    const response = await axiosInstance.get<TelegramUser[]>(
      `webAppUsers/?telegram_user_id=${IdTelegramApp}`
    )
    console.log(`response ${response.data[0]}`)
    return response.data
  },

  create(data: TelegramUser) {
    return axiosInstance.post(`webAppUsers/`, data)
  },
}
