import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import currencyFormatMoney from "../../services/current.format.money"
import { UserService } from "../../services/user.service"
import { PlaceIdProps } from "../../interface"
import { MoneyTransferService } from "../../services/moneyTransfer.service"
import { MoneyTransfer } from "../models/moneyTransfer.model"

function MoneyTransferList({ placeId }: PlaceIdProps) {
  const queryClient = useQueryClient()

  const { data: dataMoneyTransfer } = useQuery({
    queryKey: ["moneyTransfers", placeId],
    queryFn: () => MoneyTransferService.getAll(placeId),
  })

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAll(placeId),
  })

  const mutation = useMutation({
    mutationFn: (id) => MoneyTransferService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyTransfers"] })
    },
  })

  return (
    <>
      <div className="px-4">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {dataMoneyTransfer ? (
            dataMoneyTransfer.map((moneyTransfer: MoneyTransfer) => (
              <li className="mb-6 ms-4 pt-2" key={moneyTransfer.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {moneyTransfer.date}
                </time>
                <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
                  <div>{
                      dataUsers?.find(
                        (user) => user.id === moneyTransfer.who_paid_user
                      )?.username
                    } {" =>"} </div>
                  <div>{currencyFormatMoney(moneyTransfer.amount)}</div>
                </div>
                <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div>
                    Перевел(а): &nbsp;
                    {
                      dataUsers?.find(
                        (user) => user.id === moneyTransfer.who_gets_user
                      )?.username
                    }
                  </div>
                  <div>
                    {moneyTransfer.id && <a
                      href="#"
                      className="inline-block px-2 py-0.5 text-sm font-sm rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
                      onClick={() => mutation.mutate(moneyTransfer.id)}
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

export default MoneyTransferList
