import { PlaceIdProps } from "../../interface"
import { useMoneyTransfersQuery } from "../../hooks/useMoneyTransfersQuery"
import currencyFormatMoney from "../../services/current.format.money"
import { Member } from "../models/user.model"
import { useExpensesQuery } from "../../hooks/useExpensesQuery"
import { CiEdit, CiTrash } from "react-icons/ci"
import { useUsersQuery } from "../../hooks/useUsersQuery"

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
    <div className="px-2">
      {/* <ol className="relative border-s border-gray-200 dark:border-gray-700"> */}
      {isSuccess && (
        <div className="py-3">
          <div className="mx-auto max-w-sm space-y-4 rounded-lg p-1">
            {dataUsers.map((member: Member) => (
              <div
                className="px-3 py-3 rounded dark:bg-[#3D3A37] bg-white text-[#32371C] dark:text-[#D5D0CA] shadow"
                key={member.id}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>{member.username}</p>
                  </div>
                  <div>
                    <button className="rounded p-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]">
                      <CiEdit />
                    </button>
                    <button className="rounded p-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]">
                      <CiTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-[#A7A29D]">
                  Потратил(a) всего:{" "}
                  {currencyFormatMoney(userExpensesSum(member.id!))}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#A7A29D]">
                  Баланс: {BalanceUser(member.id!) >= 0 ? (
                    <span className="text-lime-600">
                      {currencyFormatMoney(BalanceUser(member.id!))}
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      {currencyFormatMoney(BalanceUser(member.id!))}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* // dataUsers.map((placeUser: Member) => (
          //   <>
          //     <li className="mb-6 ms-4 pt-2" key={placeUser.id}>
          //       <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
          //         <div>{placeUser.username}&nbsp;</div>
          //         <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          //           Удалить Ред.
          //         </div>
          //       </div>
          //       <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          //         <div>
          //           Потратил(a) всего:{" "}
          //           {currencyFormatMoney(userExpensesSum(placeUser.id!))}
          //           <p>
          //             Баланс:
          //             {BalanceUser(placeUser.id!) >= 0 ? (
          //               <div className="text-green-300">
          //                 {currencyFormatMoney(BalanceUser(placeUser.id!))}
          //               </div>
          //             ) : (
          //               <div className="text-red-400">
          //                 {currencyFormatMoney(BalanceUser(placeUser.id!))}
          //               </div>
          //             )}
          //           </p>
          //         </div>
          //       </div>
          //     </li>
          //   </>
          // ))}
      // </ol> */}
    </div>
  )
}

export default MemberList
