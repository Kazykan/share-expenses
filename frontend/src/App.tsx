import { useContext, useRef, useState } from "react"
import { usePlace } from "./hooks/place"
import { IExpense, IPlace } from "./models"
import axios from "axios"
import { Expense } from "./components/place/Expense"
import ProgressBar from "./components/ProgressBar"
import PaymentService from "./components/PaymentService"
import TransferMoney from "./components/TransferMoney"
import { CreateExpense } from "./components/form/CreateExpenseForm"
import { BtnCreateExpense } from "./components/buttons/BtnCreateExpense"
import { BtnCreatePlace } from "./components/buttons/BtnCreatePlace"
import { SearchInput } from "./components/SearchInput"

interface PlaceProps {
  place: IPlace
}

function App() {
  const { places, addPlace } = usePlace()
  const [currentState, setCurrentState] = useState("place")
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const id = useRef(0)
  const [placeId, setPlaceId] = useState(0)
  const [headerButton, setHeaderButton] = useState("place")
  const [isPlace, setIsPlace] = useState("place")

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
    setExpenses(response.data)
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
      <section className="container px-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Share expense
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Разделите расходы в поездках.
            </p>
          </div>

          {isPlace === "place" ? (
            <BtnCreatePlace setPlaceId={setPlaceId} />
          ) : (
            <BtnCreateExpense setHeaderButton={setHeaderButton} />
          )}
        </div>
        <div className="mt-6 md:flex md:items-center md:justify-between">
          {/* Изменяем цвет кнопки по значению  headerButton  */}
          {isPlace != "place" && (
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
          )}

          {headerButton === "expenses" && <SearchInput />}
        </div>

        {/* Form */}
        {headerButton === "createExpense" && (
          <CreateExpense setExpenses={setExpenses} />
        )}

        {/* Form */}

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
          expenses.map((expense) => (
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
