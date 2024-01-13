import { useQuery } from "@tanstack/react-query"
import { MoneyTransferService } from "../services/moneyTransfer.service"


const useMoneyTransfersQuery = (placeId: number) => {
  return useQuery({
    queryFn: () => MoneyTransferService.getAll(placeId),
    queryKey: ["moneyTransfers", placeId],
  })
}

export { useMoneyTransfersQuery }