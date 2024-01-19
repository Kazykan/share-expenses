import { useUsersQuery } from "../../hooks/useUsersQuery"
import currencyFormatMoney from "../../services/current.format.money"
import { PlaceIdProps } from "../../interface"
import { useMoneyTransfersQuery } from "../../hooks/useMoneyTransfersQuery"
import { useExpensesQuery } from "../../hooks/useExpensesQuery"
import { CiEdit, CiTrash } from "react-icons/ci"
import { PiArrowElbowRightDownFill } from "react-icons/pi"

function DeptAdviceList({ placeId }: PlaceIdProps) {
  const { data: dataUsers, isLoading } = useUsersQuery(placeId)
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

  function FinalBalance() {
    const tableUserTransfer = dataUsers?.map((user) => {
      const container = {
        id: user.id,
        username: user.username,
        balance: BalanceUser(user.id!),
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
      // Сортировка В начале кому должны, потом кто должен
      uTab.sort((a, b) => (a.balance < b.balance ? 1 : -1))
      // Удаляем из уравнения элементы с 0 суммой
      for (let i = 0; i < uTab.length; i++) {
        if (uTab[i].balance == 0) {
          uTab.splice(i, 1)
        }
      }
      // Если длина равно 0 выходим из цикла
      if (uTab.length == 0) {
        break
      }

      // Кому должны больше всего (+) сумма, берем 1-го и кто должен больше всего (-) берем сумму последнего
      // Если сумма (-) должен меньше (+) суммы считаем, если нет то запускаем другой if
      // Например Антон должен -500р. а Мише должны 400р. если сложит 400 - 500 = -100р. тогда запускаем другой if он ниже
      // firstMinusEnd > -1 (Вот это сравнение ниже)
      const firstMinusEnd = uTab[0].balance + uTab[uTab.length - 1].balance
      if (
        uTab[0].balance > 0 &&
        uTab[uTab.length - 1].balance < 0 &&
        firstMinusEnd > -1
      ) {
        // создаем запись для предложения о переводе
        const temp = {
          amount: Math.trunc(uTab[uTab.length - 1].balance * -1 * 100) / 100,
          date: null,
          who_paid_member_id: uTab[uTab.length - 1].id,
          who_got_member_id: uTab[0].id,
          place_id: placeId,
        }
        // обновляем значения в таблице кто должен прибавляем потому что у него сумма отрицательная
        uTab[0].balance =
          Math.trunc((uTab[0].balance + uTab[uTab.length - 1].balance) * 100) /
          100
        // обновляем баланс последнего на 0,
        // т.к. он переводит первому всю сумму долга, если это не так, то срабатывает второй if он ниже
        uTab[uTab.length - 1].balance = 0

        tNewTransfer.push(temp)
      } else if (uTab[0].balance > 0) {
        const balanceOwed = uTab[0].balance + uTab[uTab.length - 1].balance
        const temp = {
          amount:
            Math.trunc(
              (uTab[uTab.length - 1].balance - balanceOwed) * -1 * 100
            ) / 100,
          date: null,
          who_paid_member_id: uTab[uTab.length - 1].id,
          who_got_member_id: uTab[0].id,
          place_id: placeId,
        }
        // Math.trunc( x * 100 ) / 100 обрезает цифры после запятой x = 10.8976456874 -> 10.89

        uTab[0].balance =
          Math.trunc(
            (uTab[0].balance + uTab[uTab.length - 1].balance - balanceOwed) *
              100
          ) / 100

        uTab[uTab.length - 1].balance = Math.trunc(balanceOwed * 100) / 100

        tNewTransfer.push(temp) // добавляем объект в массив
      }
    }
    return tNewTransfer // отдаем его
  }

  const finalTransferList = FinalTransfer()

  // if (dataUsers?.length != undefined) {
  //   setCountUser(dataUsers.length)
  // }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <div className="px-2">
        <div className="py-3">
          <div className="mx-auto max-w-sm space-y-4 rounded-lg p-1">
            {finalTransferList ? (
              finalTransferList.map((moneyTransfer, index) => (
                <div
                  className="px-3 py-3 rounded dark:bg-[#3D3A37] bg-white text-[#32371C] dark:text-[#D5D0CA] shadow"
                  key={index}
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
                      }{" "}
                      &ensp;
                      <PiArrowElbowRightDownFill />{" "}
                    </div>
                    <div>{currencyFormatMoney(moneyTransfer.amount)}</div>
                  </div>
                  <div>
                    Должен: &nbsp;
                    {
                      dataUsers?.find(
                        (user) => user.id === moneyTransfer.who_got_member_id
                      )?.username
                    }
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Транзакций нет
              </h2>
            )}
          </div>
        </div>
      </div>
    </>

    // <div className="px-4">
    //   <ol className="relative border-s border-gray-200 dark:border-gray-700">
    //     {finalTransferList ? (
    //       finalTransferList.map((moneyTransfer, index) => (
    //         <li className="mb-6 ms-4 pt-2" key={index}>
    //           <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
    //           <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
    //             <div>
    //               {
    //                 dataUsers?.find(
    //                   (user) => user.id === moneyTransfer.who_paid_member_id
    //                 )?.username
    //               }{" "}
    //               {" =>"}{" "}
    //             </div>
    //             <div>{currencyFormatMoney(moneyTransfer.amount)}</div>
    //           </div>
    //           <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
    //             <div>
    //               Должен: &nbsp;
    //               {
    //                 dataUsers?.find(
    //                   (user) => user.id === moneyTransfer.who_got_member_id
    //                 )?.username
    //               }
    //             </div>
    //             <div>
    //               {/* {moneyTransfer.id && (
    //                 <a
    //                   href="#"
    //                   className="inline-block px-2 py-0.5 text-sm font-sm rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
    //                   onClick={() => mutation.mutate(moneyTransfer.id)}
    //                 >
    //                   Удалить
    //                 </a>
    //               )}{" "} */}
    //               Удалить Ред.
    //             </div>
    //           </div>
    //         </li>
    //       ))
    //     ) : (
    //       <h2 className="text-lg font-medium text-gray-800 dark:text-white">
    //         Поездок нет
    //       </h2>
    //     )}
    //   </ol>
    // </div>
  )
}

export default DeptAdviceList
