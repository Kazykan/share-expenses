import { useEffect, useState } from "react"
import SiteName from "./SiteName"
import PlaceItem from "./place-item/PlaceItem.jsx"
import CreatePlaceForm from "./create-place-form/CreatePlaceForm.jsx"
import { PlaceService } from "../../../services/place.service.js"
import { ExpenseService } from "../../../services/expense.service.js"
import { useQuery } from "@tanstack/react-query"
import ExpenseItem from "./place-item/ExpenseItem.jsx"
import axios from "axios"
import { UserService } from "../../../services/user.service.js"
import HeaderNavButtons from "../../ui/header.nav.buttons.jsx"

function Home() {
  const [telegram_user_id, setTelegramUserId] = useState(1)
  const [pageState, setPageState] = useState("place")
  const [isPlaceForm, setIsPlaceForm] = useState(false)
  const [headerButton, setHeaderButton] = useState("expenses")
  const [placeId, setPlaceId] = useState(1)
  const [userId, setUserId] = useState(1)

  const { data: dataPlace } = useQuery({
    queryKey: ["places"],
    queryFn: () => PlaceService.getAll(),
  })
  const { data: dataExpense } = useQuery({
    queryKey: placeId,
    queryFn: () => ExpenseService.getAll(placeId),
  })

  return (
    <>
      <SiteName />
      {isPlaceForm && <CreatePlaceForm telegram_user_id={telegram_user_id} />}
      {pageState != "place" && (
        <HeaderNavButtons
          setHeaderButton={setHeaderButton}
          headerButton={headerButton}
        />
      )}
      {pageState === "place" && (
        <div className="p-2">
          {/* TODO: есть ли элементы в списке data.length не работает */}
          {dataPlace ? (
            dataPlace?.map((place) => (
              <PlaceItem
                setPageState={setPageState}
                setPlaceId={setPlaceId}
                key={place.id}
                place={place}
              />
            ))
          ) : (
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Поездок нет
            </h2>
          )}
        </div>
      )}

      {pageState === "expenses" && (
        <div className="p-2">
          {/* TODO: есть ли элементы в списке data.length не работает */}
          {dataExpense ? (
            dataExpense.map((expense) => (
              <ExpenseItem
                setPageState={setPageState}
                setPlaceId={setPlaceId}
                key={expense.id}
                expense={expense}
              />
            ))
          ) : (
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Поездок нет
            </h2>
          )}
        </div>
      )}
      <button
        className="absolute bottom-10 right-10 rounded-full bg-blue-200 text-white text-2xl px-3 py-1"
        onClick={() => setIsPlaceForm((prev) => !prev)}
      >
        +
      </button>
    </>
  )
}

export default Home
