import { MoneyTransfer } from "../components/models/moneyTransfer.model"
import { axiosInstance } from "./api"

export const MoneyTransferService = {
  async getAll(PlaceId: number) {
    const response = await axiosInstance.get<MoneyTransfer[]>(
      `money_transfers/?place_id=${PlaceId}`
      )
    return response.data
  },

  create(data: MoneyTransfer) {
    return axiosInstance.post(`money_transfers/`, data)
  },

  delete(id: number) {
    return axiosInstance.delete(`money_transfers/${id}/`)
  },
}