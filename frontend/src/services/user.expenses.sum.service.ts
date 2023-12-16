// import { useState } from "react"
// import { useExpenseOneUserQuery } from "../hooks/useExpenseOneUserQuery"
// import { Expense } from "../components/models/expense.model"

// function UserExpensesSum({userId}: any): number {
//   const [userSum, setUserSum] = useState(0)

//   const { data, isSuccess } = useExpenseOneUserQuery(userId)
//   console.log(userId)

//   if (isSuccess) {
//     data.map((expense) => {
//         console.log(expense.data)
//       setUserSum((prev) => prev + expense.cost)
//     })
//   }
//   console.log(userId, userSum)
//   return userSum
// }
// //  console.log(currencyFormatMoney(2665)); // 2,665.00 $
// export default UserExpensesSum
