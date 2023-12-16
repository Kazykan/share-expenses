// import { useQuery } from "@tanstack/react-query"
// import { ExpenseService } from "../../../services/expense.service"
// import { User } from "../../models/user.model"


// const UserItem = ({ placeUser } : User ) => {

//   const { data: dataExpense } = useQuery({
//     queryKey: ["expenses"],
//     queryFn: () => ExpenseService.getAll(1),
//   })

//   const userSum = dataExpense?.filter(
//     (expanse) => expanse.cost === placeUser.id
//   ).reduce((total, expense) => total + expense.cost, 0)
//     console.log(userSum)

//   return (
//     <li className="mb-6 ms-4 pt-2">
//       <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
//         <div>{placeUser.username} {userSum}</div>
//         <div className="text-sm font-normal text-gray-500 dark:text-gray-400">Удалить Ред.</div>
//       </div>
//     </li>
//   )
// }

// export { UserItem }
