import { useQuery } from "@tanstack/react-query"
import { ExpenseService } from "../services/expense.service"

const useExpensesQuery = (placeId: number) => {
  return useQuery({
    queryFn: () => ExpenseService.getAll(placeId),
    queryKey: ["expenses", placeId],
  })
}

export { useExpensesQuery }
