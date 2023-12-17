import { useUsersQuery } from "../../hooks/useUsersQuery"
import { User } from "../models/user.model"
import { ExpenseService } from "../../services/expense.service"
import { useQuery } from "@tanstack/react-query"
import currencyFormatMoney from "../../services/current.format.money"
import { PlaceIdProps } from "../../interface"
import { useMoneyTransfersQuery } from "../../hooks/useMoneyTransfersQuery"

function UserList({ placeId }: PlaceIdProps) {
  const { data: dataUsers, isLoading, isSuccess } = useUsersQuery(placeId)
  const { data: dataMoneyTransfer } = useMoneyTransfersQuery(placeId)

  const { data: dataExpense } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => ExpenseService.getAll(placeId),
  })

  function userExpensesSum(userId: number) {
    var sum = dataExpense
      ?.filter((expanse) => expanse.who_paid_user === userId)
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
      ?.filter((transfer) => transfer.who_paid_user == userId)
      .reduce((total, transfer) => total + transfer.amount, 0)
    if (plusSum == undefined) {
      plusSum = 0
    }
    var minusSum = dataMoneyTransfer
      ?.filter((transfer) => transfer.who_gets_user == userId)
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

  function FinalBalance() {
    const tableUserTransfer = dataUsers?.map((user) => {
      const container = {
        id: user.id,
        username: user.username,
        balance: BalanceUser(user.id),
      }
      return container
    })
    return tableUserTransfer
  }

  function FinalTransfer() {
    let uTab = FinalBalance()

    const tNewTransfer = []
    if (uTab == undefined) {
      return undefined
    }
    uTab.sort((a, b) => (a.balance < b.balance ? 1 : -1))

    while (uTab.length !== 0) {
    // Удаляем из уравнения элементы с 0 суммой
    uTab.sort((a, b) => (a.balance < b.balance ? 1 : -1))
    for (let i = 0; i < uTab.length; i++) {
      if (uTab[i].balance == 0) {
        uTab.splice(i, 1)
      }
    }
    if (uTab.length == 0) {
      break
    }

    const firstMinusEnd = uTab[0].balance + uTab[uTab.length - 1].balance
    if (
      uTab[0].balance > 0 &&
      uTab[uTab.length - 1].balance < 0 &&
      firstMinusEnd > -1
    ) {
      const temp = {
        amount: uTab[uTab.length - 1].balance * -1,
        date: null,
        who_paid_user: uTab[uTab.length - 1].id,
        who_gets_user: uTab[0].id,
        place: placeId,
      }
      uTab[0].balance = uTab[0].balance + uTab[uTab.length - 1].balance

      uTab[uTab.length - 1].balance = 0

      tNewTransfer.push(temp)
    } else if (uTab[0].balance > 0) {
      const balanceOwed = uTab[0].balance + uTab[uTab.length - 1].balance
      const temp = {
        amount: (uTab[uTab.length - 1].balance - balanceOwed) * -1,
        date: null,
        who_paid_user: uTab[uTab.length - 1].id,
        who_gets_user: uTab[0].id,
        place: placeId,
      }
      uTab[0].balance =
        uTab[0].balance + uTab[uTab.length - 1].balance - balanceOwed
      uTab[uTab.length - 1].balance = balanceOwed

      tNewTransfer.push(temp)
    }
    }
    return tNewTransfer
  }

  console.log(FinalTransfer())

  // if (dataUsers?.length != undefined) {
  //   setCountUser(dataUsers.length)
  // }

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
                    {currencyFormatMoney(userExpensesSum(placeUser.id))}
                    <p>
                      Баланс:
                      {BalanceUser(placeUser.id) >= 0 ? (
                        <div className="text-green-300">
                          {currencyFormatMoney(BalanceUser(placeUser.id))}
                        </div>
                      ) : (
                        <div className="text-red-400">
                          {currencyFormatMoney(BalanceUser(placeUser.id))}
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

export default UserList
