import { PlaceIdProps } from "../interface"
import { axiosInstance } from "./api"
import { Member } from "../components/models/user.model"

export const UserService = {
  async getAll(placeId: number) {
    const response = await axiosInstance.get<Member[]>(
      `members/?place_id=${placeId}`
    )

    return response.data
  },

  create(data: Member) {
    return axiosInstance.post(`members/`, data)
  },

  delete(id: number) {
    return axiosInstance.delete(`members/${id}/`)
  },

  async count(placeId: PlaceIdProps) {
    const response = await axiosInstance.get(
      `members/?place_id=${placeId}`
    )
      if (response.data.length == undefined) {
        return 0
      } else return response.data.length
  },
}
