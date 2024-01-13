import { WebAppUser } from "../components/models/telegramuser.model"
import { axiosInstance } from "./api"

export const TUserService = {
  async get(IdTelegramApp: number | undefined) {
    if (IdTelegramApp === undefined) return []

    const response = await axiosInstance.get<WebAppUser[]>(
      `webAppUsers/?telegram_user_id=${IdTelegramApp}`
    )
    console.log(`response ${response.data[0]}`)
    return response.data
  },

  create(data: WebAppUser) {
    console.log(data)
    return axiosInstance.post(`webAppUsers/`, data)
  },
}
