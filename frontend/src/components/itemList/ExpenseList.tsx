import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import currencyFormatMoney from "../../services/current.format.money"
import { ExpenseService } from "../../services/expense.service"
import { Expense } from "../models/expense.model"
import { UserService } from "../../services/user.service"
import { PlaceIdProps } from "../../interface"

function ExpenseList({ placeId }: PlaceIdProps) {
  const queryClient = useQueryClient()

  const { data: dataExpense } = useQuery({
    queryKey: ["expenses", placeId],
    queryFn: () => ExpenseService.getAll(placeId),
  })

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAll(placeId),
  })

  const mutation = useMutation({
    mutationFn: (id) => ExpenseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })

  return (
    <>
      <div className="px-4">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {dataExpense ? (
            dataExpense.map((expense: Expense) => (
              <li className="mb-6 ms-4 pt-2" key={expense.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {expense.date}
                </time>
                <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
                  <div>{expense.name}</div>
                  <div>{currencyFormatMoney(expense.cost)}</div>
                </div>
                <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div>
                    Оплатил(a):{" "}
                    {
                      dataUsers?.find(
                        (user) => user.id === expense.who_paid_user
                      )?.username
                    }
                  </div>
                  <div>
                    {expense.id && <a
                      href="#"
                      className="inline-block px-2 py-0.5 text-sm font-sm rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
                      onClick={() => mutation.mutate(expense.id)}
                    >
                      Удалить
                    </a>}
                   {" "}
                    Ред.
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Поездок нет
            </h2>
          )}
        </ol>
      </div>
    </>
  )
}

export default ExpenseList
