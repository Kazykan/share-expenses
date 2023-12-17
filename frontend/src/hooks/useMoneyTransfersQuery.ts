import { useQuery } from "@tanstack/react-query"

import { PlaceIdProps } from "../interface"
import { MoneyTransferService } from "../services/moneyTransfer.service"

const useMoneyTransfersQuery = (placeId: PlaceIdProps) => {
  return useQuery({
    queryFn: () => MoneyTransferService.getAll(placeId),
    queryKey: ["moneyTransfers", placeId],
  })
}

export { useMoneyTransfersQuery }