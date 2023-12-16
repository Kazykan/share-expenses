import axios from "axios"
import { Expense } from "../components/models/expense.model"

export const ExpenseService = {
  async getAll(PlaceId: number | null) {
    if (PlaceId === null) return []
    const response = await axios.get<Expense[]>(
      `http://127.0.0.1:8000/api/v1/Expense/?place=${PlaceId}`
    )
    return response.data
  },

  getForUser(userId: number) {
    const response = axios.get<Expense[]>(
      `http://127.0.0.1:8000/api/v1/Expense/?place=&who_paid_user=${userId}`)
      return response
  },

  create(data: Expense) {
    return axios.post("http://127.0.0.1:8000/api/v1/Expense/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/Expense/${id}/`)
  },
}
