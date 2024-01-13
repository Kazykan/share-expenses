import { useUsersQuery } from "../../hooks/useUsersQuery"
import { PlaceIdProps } from "../../interface"
import { useMoneyTransfersQuery } from "../../hooks/useMoneyTransfersQuery"
import currencyFormatMoney from "../../services/current.format.money"
import { Member } from "../models/user.model"
import { useExpensesQuery } from "../../hooks/useExpensesQuery"



function MemberList({ placeId }: PlaceIdProps) {
  const placeIdNumber = Number(placeId)

  const { data: dataUsers, isLoading, isSuccess } = useUsersQuery(placeIdNumber)
  const { data: dataMoneyTransfer } = useMoneyTransfersQuery(placeId)
  const { data: dataExpense } = useExpensesQuery(placeId)

  function userExpensesSum(userId: number) {
    var sum = dataExpense
      ?.filter((expanse) => expanse.who_paid_member_id === userId)
      .reduce((total, expense) => total + expense.cost, 0)
    if (sum == undefined) {
      return 0
    } else {
      return sum
    }
  }

  function EqualShareCosts() {
    var sumExpenses = dataExpense?.reduce(
      (total, expense) => total + expense.cost,
      0
    )
    if (sumExpenses == undefined) {
      sumExpenses = 0
    }
    var countUsers = dataUsers?.length
    if (countUsers == undefined) {
      countUsers = 0
    }
    return sumExpenses / countUsers
  }

  function UserMoneyTransferSum(userId: number) {
    var plusSum = dataMoneyTransfer
      ?.filter((transfer) => transfer.who_paid_member_id == userId)
      .reduce((total, transfer) => total + transfer.amount, 0)
    if (plusSum == undefined) {
      plusSum = 0
    }
    var minusSum = dataMoneyTransfer
      ?.filter((transfer) => transfer.who_got_member_id == userId)
      .reduce((total, transfer) => total + transfer.amount, 0)
    if (minusSum == undefined) {
      minusSum = 0
    }
    return plusSum - minusSum
  }

  function BalanceUser(userId: number) {
    return (
      userExpensesSum(userId) - EqualShareCosts() + UserMoneyTransferSum(userId)
    )
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="px-4">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {isSuccess &&
          dataUsers.map((placeUser: Member) => (
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
                    {currencyFormatMoney(userExpensesSum(placeUser.id!))}
                    <p>
                      Баланс:
                      {BalanceUser(placeUser.id!) >= 0 ? (
                        <div className="text-green-300">
                          {currencyFormatMoney(BalanceUser(placeUser.id!))}
                        </div>
                      ) : (
                        <div className="text-red-400">
                          {currencyFormatMoney(BalanceUser(placeUser.id!))}
                        </div>
                      )}
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

export default MemberList

