import axios from "axios"
import { Place } from "../components/models/place.model"

export const PlaceService = {
  async getAll() {
    const response = await axios.get<Place[]>(
      `http://127.0.0.1:8000/api/v1/Place/?name=&telegram_user_id=1`
    )

    return response.data
  },

  create(data: Place) {
    return axios.post("http://127.0.0.1:8000/api/v1/Place/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/Place/${id}`)
  },
}
