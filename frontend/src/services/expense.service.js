import axios from "axios"

export const ExpenseService = {
  async getAll(id) {
    const response = await axios.get(
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
