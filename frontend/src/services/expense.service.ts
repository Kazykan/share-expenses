import axios from "axios"
import { Expense } from "../components/models/expense.model"
import { UrlServer } from "./crud.server.url"

export const ExpenseService = {
  async getAll(PlaceId: number) {
    if (PlaceId === null) return []
    const response = await axios.get<Expense[]>(
      `${UrlServer}Expense/?place=${PlaceId}`
    )
    return response.data
  },

  getForUser(userId: number) {
    const response = axios.get<Expense[]>(
      `${UrlServer}Expense/?place=&who_paid_user=${userId}`)
      return response
  },

  create(data: Expense) {
    return axios.post(`${UrlServer}Expense/`, data)
  },

  delete(id: number) {
    return axios.delete(`${UrlServer}Expense/${id}/`)
  },
}
