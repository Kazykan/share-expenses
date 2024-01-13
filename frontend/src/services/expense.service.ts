import { Expense } from "../components/models/expense.model"
import { axiosInstance } from "./api"

export const ExpenseService = {
  async getAll(PlaceId: number) {
    if (PlaceId === null) return []
    const response = await axiosInstance.get<Expense[]>(
      `expenses/?place_id=${PlaceId}`
    )
    return response.data
  },

  getForUser(userId: number) {
    const response = axiosInstance.get<Expense[]>(
      `expenses/?who_paid_member_id=${userId}`)
      return response
  },

  create(data: Expense) {
    return axiosInstance.post(`expenses/`, data)
  },

  delete(id: number) {
    return axiosInstance.delete(`expenses/${id}/`)
  },
}
