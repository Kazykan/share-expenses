import { useQuery } from "@tanstack/react-query"
import { ExpenseService } from "../services/expense.service"

const useExpenseOneUserQuery = (userId: number) => {
  return useQuery({
    queryFn: () => ExpenseService.getForUser(userId),
    queryKey: ["expensesUser"],
  })
}

export { useExpenseOneUserQuery }
