import { useUsersQuery } from "../../hooks/useUsersQuery"
import { User } from "../models/user.model"
import { ExpenseService } from "../../services/expense.service"
import { useQuery } from "@tanstack/react-query"
import currencyFormatMoney from "../../services/current.format.money"
import { PlaceIdProps } from "../../interface"
import { useState } from "react"

const UserList = ({ placeId }: PlaceIdProps) => {
  const { countUser, setCountUser } = useState<number>(0)
  const { data: dataUsers, isLoading, isSuccess } = useUsersQuery(placeId)

  const { data: dataExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => ExpenseService.getAll(placeId),
  })

  if (dataUsers?.length != undefined) {
    setCountUser(dataUsers.length)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="px-4">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {isSuccess &&
          dataUsers.map((placeUser: User) => (
            <>
              <li className="mb-6 ms-4 pt-2" key={placeUser.id}>
                <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
                  <div>{placeUser.username}&nbsp;</div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Удалить Ред.
                  </div>
                </div>
                <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div>
                    Потратил(a) всего:{" "}
                    {currencyFormatMoney(
                      dataExpense
                        ?.filter(
                          (expanse) => expanse.who_paid_user === placeUser.id
                        )
                        .reduce((total, expense) => total + expense.cost, 0)
                    )}
                    <p>
                      Потратили всего:
                      {currencyFormatMoney(
                        dataExpense?.reduce(
                          (total, expense) => total + expense.cost,
                          0
                        )
                      )}
                      {dataExpense && dataExpense.length}
                    </p>
                  </div>
                </div>
              </li>
            </>
          ))}
      </ol>
    </div>
  )
}

export { UserList }
