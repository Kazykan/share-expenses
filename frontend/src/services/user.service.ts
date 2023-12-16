import axios from "axios"
import { User } from "../components/models/user.model"

export const UserService = {
  async getAll(placeId: number) {
    const response = await axios.get<User[]>(
      `http://127.0.0.1:8000/api/v1/User/?place=${placeId}`
    )

    return response.data
  },

  create(data: User) {
    return axios.post("http://127.0.0.1:8000/api/v1/User/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/User/${id}/`)
  },
}
