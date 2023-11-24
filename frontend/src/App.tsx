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
      <div className="border-b border-gray-200">
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
