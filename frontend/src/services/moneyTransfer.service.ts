import axios from "axios"
import { MoneyTransfer } from "../components/models/moneyTransfer.model"
import { PlaceIdProps } from "../interface"

export const MoneyTransferService = {
  async getAll(PlaceId: PlaceIdProps) {
    const response = await axios.get<MoneyTransfer[]>(
      `http://127.0.0.1:8000/api/v1/MoneyTransfer/?place=${PlaceId}`
      )
    return response.data
  },

  create(data: MoneyTransfer) {
    return axios.post("http://127.0.0.1:8000/api/v1/MoneyTransfer/", data)
  },

  delete(id: number) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/MoneyTransfer/${id}/`)
  },
}