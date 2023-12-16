import axios from "axios"
import { MoneyTransfer } from "../components/models/moneyTransfer.model"

export const MoneyTransferService = {
  async getAll(PlaceId: number) {
    const response = await axios.get<MoneyTransfer[]>(
      `http://127.0.0.1:8000/api/v1/MoneyTransfer/?place=${PlaceId}`
      )
    return response.data
  },

  create(data: MoneyTransfer) {
    return axios.post("http://127.0.0.1:8000/api/v1/Expense/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/Expense/${id}/`)
  },
}