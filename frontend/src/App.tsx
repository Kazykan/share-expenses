import { useRef, useState } from "react"
import { usePlace } from "./hooks/place"
import { IExpense, IPlace } from "./models"
import axios from "axios"
import { Expense } from "./components/place/Expense"

interface PlaceProps {
  place: IPlace
}

function App() {
  const { places, addPlace } = usePlace()
  const [currentState, setCurrentState] = useState("place")
  const [expense, setExpense] = useState<IExpense[]>([])
  const id = useRef(0)

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
      {/* header */}
      <div className="border-b border-gray-200 m-1">
        <nav className="-mb-px flex gap-6">
          <a
            href="#"
            className="shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-sky-600"
          >
            Расходы
          </a>

          <a
            href="#"
            className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Баланс
          </a>
        </nav>
      </div>

      {/* Траты */}
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

      <article className="rounded-lg border border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-900 m-2">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">
            $240.94
          </p>
        </div>

        <div className="mt-1 flex gap-1 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>

          <p className="flex gap-2 text-xs">
            <span className="font-medium"> 67.81% </span>
            <span className="text-gray-500 dark:text-gray-400">
              {" "}
              Since last week{" "}
            </span>
          </p>
        </div>
      </article>

      {/* Траты */}

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
