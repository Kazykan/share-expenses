import { useContext, useRef, useState } from "react"
import { usePlace } from "./hooks/place"
import { IExpense, IPlace } from "./models"
import axios from "axios"
import { Expense } from "./components/place/Expense"
import { PlaceIdContext } from "./components/PlaceIdContext"
import ProgressBar from "./components/ProgressBar"
import PaymentService from "./components/PaymentService"
import TransferMoney from "./components/TransferMoney"

interface PlaceProps {
  place: IPlace
}

function App() {
  const { places, addPlace } = usePlace()
  const [currentState, setCurrentState] = useState("place")
  const [expense, setExpense] = useState<IExpense[]>([])
  const id = useRef(0)
  const [placeId, setPlaceId] = useState(0)
  const [headerButton, setHeaderButton] = useState("expenses")

  const togglePlaceId = (id: number) => {
    setPlaceId((currentValue) => id)
  }

  const clickPlaceHandler = (ids: number) => {
    console.log(ids)
    id.current = ids
    console.log(id)
    setCurrentState("Expense List")
    ExpenseList()
  }

  async function ExpenseList() {
    console.log(`http://127.0.0.1:8000/api/v1/Expense/?place=${id.current}`)
    const response = await axios.get<IExpense[]>(
      `http://127.0.0.1:8000/api/v1/Expense/?place=${id.current}`
    )
    setExpense(response.data)
  }

  const Place = ({ place: place }: PlaceProps) => {
    return (
      <button
        className="h-10 px-40 font-semibold rounded-md border border-slate-200 text-slate-900 hover:bg-black hover:text-white"
        type="button"
        onClick={() => clickPlaceHandler(Number(place.id))}
      >
        {place.name}
      </button>
    )
  }

  return (
    <>
      {/* test data  */}
      {/* test data  */}

      <section className="container px-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Share expense
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              These companies have purchased in the last 12 months.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3098_154395)">
                  <path
                    d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                    stroke="currentColor"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3098_154395">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>Назад</span>
            </button>

            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Добавить траты</span>
            </button>
          </div>
        </div>

        <div className="mt-6 md:flex md:items-center md:justify-between">
          {/* Изменяем цвет кнопки по значению  headerButton  */}
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                headerButton === "expenses"
                  ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setHeaderButton("expenses")}
            >
              Расходы
            </button>

            <button
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                headerButton === "balance"
                  ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setHeaderButton("balance")}
            >
              Баланс
            </button>

            <button
              className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
                headerButton === "debt"
                  ? "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                  : "dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setHeaderButton("debt")}
            >
              Задолженость
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        {/* Table  */}
        {/* Table  */}
        {headerButton === "expenses" && (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <PaymentService
                paymentName={"Обед"}
                paymentUser={"Руфат"}
                paymentDate={"2023-11-22"}
                paymentCost={"1200 руб."}
              />

              <TransferMoney
                TransferMoneyWhoPay={"Лукман"}
                TransferMoneyWhoGets={"Руфат"}
                TransferMoneyDate={"2023-11-22"}
                TransferMoneyCost={"25 000"}
              />
            </tbody>
          </table>
        )}

        {/* Table  */}

        {headerButton === "balance" && (
          <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                <ProgressBar
                  progressPercentage={60}
                  progressColor={true}
                  progressName={"Руфат"}
                  progressCost={"+ 12 000 руб."}
                />
                <ProgressBar
                  progressPercentage={10}
                  progressColor={false}
                  progressName={"Masha"}
                  progressCost={"- 6 000 руб."}
                />
                <ProgressBar
                  progressPercentage={80}
                  progressColor={true}
                  progressName={"Boris"}
                  progressCost={"+ 25 000 руб."}
                />
              </tbody>
            </table>
          </>
        )}

        {/* Table  */}

        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              1 of 10
            </span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </a>

            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* test data  */}
      {/* test data  */}

      <div className="container mx-auto max-w-2px pt-5">
        {currentState === "place" && (
          <div className="relative mt-2">Списки мест</div>
        )}
        {currentState === "place" &&
          places.map((place) => <Place place={place} key={place.id} />)}

        {currentState === "Expense List" && (
          <div className="relative mt-2">Траты</div>
        )}
        {currentState === "Expense List" &&
          expense.map((expense) => (
            <Expense expense={expense} key={expense.id} />
          ))}
      </div>
    </>
  )
}

export default App

// import { useState } from "react"
// import { CreateProduct } from "./components/CreateProduct"
// import { ErrorMessage } from "./components/ErrorMessage"
// import { Loader } from "./components/Loader"
// import { Modal } from "./components/Modal"
// import { Product } from "./components/Product"
// import { useProducts } from "./hooks/products"
// import { IProduct } from "./models"
// import { usePlace } from "./hooks/place"
// import { Place } from "./components/place/Place"

// function App() {
//   const { loading, error, products, addProduct } = useProducts()
//   const { places, addPlace } = usePlace()
//   const [modal, setModal] = useState(false)
//   const [currentState, useCurrentState] = useState("place")

//   // const clickPlaceHandler =
//   const createHandler = (products: IProduct) => {
//     setModal(false)
//     addProduct(products)
//   }

//   return (
//     <>
//       <div className="container mx-auto max-w-2px pt-5">
//         {loading && <Loader />}
//         {error && <ErrorMessage error={error} />}

//         {currentState === "place" && (
//           <>
//             <div className="relative mt-2">Списки мест</div>
//           </>
//         )}
//         {currentState === "place" &&
//           places.map((place) => <Place place={place} key={place.id} />)}

//         {modal && (
//           <Modal title="Create new product" onClose={() => setModal(false)}>
//             <CreateProduct onCreate={createHandler} />
//           </Modal>
//         )}
//         <button
//           className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4"
//           onClick={() => setModal(true)}
//         >
//           +
//         </button>
//       </div>
//     </>
//   )
// }

// export default App
