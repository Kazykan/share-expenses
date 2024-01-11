import axios, { AxiosError, AxiosResponse } from "axios"
import { TelegramUser } from "../components/models/telegramuser.model"
import { axiosInstance } from "./api"

export const TUserService = {

  async get(IdTelegramApp: number | undefined) {
    if (IdTelegramApp === undefined) return undefined

    try {
      const response: AxiosResponse<TelegramUser | undefined> = await axiosInstance.get<TelegramUser | undefined>(`webAppUsers/?telegram_user_id=${IdTelegramApp}`)
      return response.data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(`error.response: ${error.response.status}`)
        return undefined
      } else if (error.request) {
        return error.request
    } else {
      return error.message
    }
  }},
    // catch (error) {
    //   console.log(`error --- ${error}`)
    //   if (axios.isAxiosError(error)) {
    //     const axiosError = error as AxiosError
    //     if (axiosError.response) {
    //       return undefined
    //     }
    //   } else {
    //     return undefined
    //   }
    // }
  // },

  //   console.log(`get ${IdTelegramApp}`)
  //   if (IdTelegramApp === undefined) return undefined

  //   const response = await axiosInstance.get<TelegramUser>(
  //     `webAppUsers/?telegram_user_id=${IdTelegramApp}`
  //   )
  //   return response.data
  // } .catch (_: any) {
  //   return undefined
  // },

  create(data: TelegramUser) {
    return axiosInstance.post(`webAppUsers/`, data)
  },
}
