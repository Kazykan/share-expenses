import axios from "axios"
import { User, inputUserProps } from "../components/models/user.model"
import { PlaceIdProps } from "../interface"

export const UserService = {
  async getAll(placeId: PlaceIdProps) {
    const response = await axios.get<User[]>(
      `http://127.0.0.1:8000/api/v1/User/?place=${placeId}`
    )

    return response.data
  },

  create(data: inputUserProps) {
    return axios.post("http://127.0.0.1:8000/api/v1/User/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/User/${id}/`)
  },

  async count(placeId: PlaceIdProps) {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/User/?place=${placeId}`
    )
      if (response.data.length == undefined) {
        return 0
      } else return response.data.length
  },
}
