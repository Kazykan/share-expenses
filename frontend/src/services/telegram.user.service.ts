import { TelegramUser } from "../components/models/telegramuser.model"
import { axiosInstance } from "./api"

export const TUserService = {
  async get(id_telegram_app: number | undefined) {
    console.log(`get ${id_telegram_app}`)
    if (id_telegram_app === undefined) return undefined

    const response = await axiosInstance.get<TelegramUser>(
      `webAppUsers/?telegram_user_id=${id_telegram_app}`
    )
    // console.log(response.data)
    if (response.data) {
      return response.data
    } else {
      return undefined // [] получаем пустой список возвращаем undefined
    }
  },

  create(data: TelegramUser) {
    return axiosInstance.post(`TelegramUser/`, data)
  },
}
