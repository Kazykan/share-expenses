import axios from "axios"
import { Expense } from "../components/models/expense.model"

export const ExpenseServiceTS = {
  async getAll(id: string) {
    const response = await axios.get<Expense[]>(
      `http://127.0.0.1:8000/api/v1/Expense/?place=${id}`
      )
    return response.data
  },

  create(data) {
    return axios.post("http://127.0.0.1:8000/api/v1/Expense/", data)
  },

  delete(id) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/Expense/${id}/`)
  },
}
