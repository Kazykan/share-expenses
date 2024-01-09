import { Place } from "../components/models/place.model"
import { axiosInstance } from "./api"

export const PlaceService = {
  async getAll(telegramUserId: number | undefined) {
    if (telegramUserId === undefined) {
      return undefined
    }

    const response = await axiosInstance.get<Place[]>(
      `places/?web_app_user_id=${telegramUserId}`
    )
    return response.data
  },

  create(data: Place) {
    return axiosInstance.post(`places/`, data)
  },

  delete(id: number) {
    return axiosInstance.delete(`places/${id}`)
  },
}
