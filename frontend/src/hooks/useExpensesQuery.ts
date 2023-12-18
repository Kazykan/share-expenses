import { useQuery } from "@tanstack/react-query"
import { PlaceIdProps } from "../interface"
import { ExpenseService } from "../services/expense.service"

const useExpensesQuery = (placeId: PlaceIdProps) => {
  return useQuery({
    queryFn: () => ExpenseService.getAll(placeId),
    queryKey: ["expenses"],
  })
}

export { useExpensesQuery }
