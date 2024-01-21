import { useMutation, useQueryClient } from "@tanstack/react-query"
import currencyFormatMoney from "../../services/current.format.money"
import { PlaceIdProps } from "../../interface"
import { MoneyTransferService } from "../../services/moneyTransfer.service"
import { MoneyTransfer } from "../models/moneyTransfer.model"
import { useMoneyTransfersQuery } from "../../hooks/useMoneyTransfersQuery"
import { useUsersQuery } from "../../hooks/useUsersQuery"
import { PiArrowElbowRightDownFill } from "react-icons/pi"
import { CiEdit, CiTrash } from "react-icons/ci"

function MoneyTransferList({ placeId }: PlaceIdProps) {
  const { data: dataMoneyTransfer } = useMoneyTransfersQuery(placeId)
  const { data: dataUsers } = useUsersQuery(placeId)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => MoneyTransferService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyTransfers"] })
    },
  })

  return (
    <>
      <div className="px-2">
        <div className="py-3">
          <div className="mx-auto max-w-sm space-y-4 rounded-lg p-1">
            {dataMoneyTransfer?.length ? (
              dataMoneyTransfer.map((moneyTransfer: MoneyTransfer) => (
                <div
                  className="px-3 py-3 rounded dark:bg-[#3D3A37] bg-white text-[#32371C] dark:text-[#D5D0CA] shadow"
                  key={moneyTransfer.id}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#A7A29D]">
                        {moneyTransfer.date}
                      </p>
                    </div>
                    <div className="text-lg space-x-5">
                      <button className="rounded px-2 py-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]">
                        <CiEdit />
                      </button>
                      <button
                        className="rounded px-2 py-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]"
                        onClick={() => mutation.mutate(moneyTransfer.id!)}
                      >
                        <CiTrash />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between pb-1">
                    <div className="flex items-center">
                      {
                        dataUsers?.find(
                          (user) => user.id === moneyTransfer.who_paid_member_id
                        )?.username
                      }
                      &ensp;
                      <PiArrowElbowRightDownFill />{" "}
                    </div>
                    <div>{currencyFormatMoney(moneyTransfer.amount)}</div>
                  </div>
                  <div>
                    Перевел(а): &nbsp;
                    {
                      dataUsers?.find(
                        (user) => user.id === moneyTransfer.who_got_member_id
                      )?.username
                    }
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-lg font-medium text-gray-800 dark:text-white text-center">
                Транзакций нет
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MoneyTransferList
