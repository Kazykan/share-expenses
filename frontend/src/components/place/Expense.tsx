import { useContext } from "react"
import { IExpense, } from "../../models"
import { PlaceIdContext } from "../PlaceIdContext"

interface ExpenseProps {
  expense: IExpense
}

// export const Card = () => {
//   const { placeId } = useContext(PlaceIdContext)
// }

export function Expense({ expense: expense }: ExpenseProps) {

  return (
<>
    <article>
    <div className="flex rounded-lg border border-gray-100 bg-white m-2">
      <div className="w-8/12 ">
        <div className="p-1 m-2">
          <p className="text-sm text-gray-500">Обед</p>
          <p className="text-2xl font-medium text-gray-900">1200р.</p>
          <div className="mt-1 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-5"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
              <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
            </svg>
            <p className="flex gap-2 text-xs">
              <span className="font-medium"> Rufat </span>
              <span className="text-gray-500"> 2023-11-22 </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-4/12">
        <div className="p-1 m-2 h-2/5 content-center flex">
          <button
            type="button"
            className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            &ensp;Edit
          </button>
        </div>
        <div className="bg-white p-1 m-1 h-2/5">
          <button
            type="button"
            className="flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            &ensp;Delete
          </button>
        </div>
      </div>
    </div>
  </article>
    <button className="h-10 px-40 font-semibold rounded-md border border-slate-200 text-slate-900 hover:bg-black hover:text-white" type="button">
          {expense.name} - {expense.cost}руб. {expense.date} who paid: {expense.who_paid_user}
        </button>
    </>
  )
}


// export function Place({ place: place }: PlaceProps) {

//   return (
//     <>
//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           {place.telegram_user_id}
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">{place.name}</a>
//         </h3>
//       </div>
//     </>
//   )
// }

// /* <section className="bg-white dark:bg-gray-900 antialiased">
// <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
//   <div className="max-w-3xl mx-auto text-center">
//     <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
//       Schedule
//     </h2>

//   </div>

//   <div className="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
//     <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">

//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           {place.telegram_user_id}
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">{place.name}</a>
//         </h3>
//       </div>

//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           09:00 - 10:00
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">Bergside LLC: Controlling the video traffic flows</a>
//         </h3>
//       </div>
//     </div>
//   </div>
// </div>
// </section> */