import axios from "axios"
import { Place } from "../components/models/place.model"
import { UrlServer } from "./crud.server.url"

export const PlaceService = {
  async getAll(telegramUserId: number | undefined) {
    console.log(`place.getAll telegramUserId: ${telegramUserId}`)
    if (telegramUserId === undefined) {
      return undefined
    }

    const response = await axios.get<Place[]>(
      `${UrlServer}Place/?name=&telegram_user_id=${telegramUserId}`
    )
    return response.data
  },

  create(data: Place) {
    return axios.post(`${UrlServer}Place/`, data)
  },

  delete(id: number) {
    return axios.delete(`${UrlServer}Place/${id}`)
  },
}
