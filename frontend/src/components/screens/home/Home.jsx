import { useEffect, useState } from "react"
import SiteName from "./SiteName"
import PlaceItem from "./place-item/PlaceItem.jsx"
import CreatePlaceForm from "./create-place-form/CreatePlaceForm.jsx"
import { PlaceService } from "../../../services/place.service.js"
import { useQuery } from "@tanstack/react-query"

function Home() {
  const [telegram_user_id, setTelegramUserId] = useState(1)
  const [pageState, setPageState] = useState("place")
  const [isPlaceForm, setIsPlaceForm] = useState(false)
  const { data } = useQuery({
    queryKey: ["places"],
    queryFn: () => PlaceService.getAll(),
  })

  return (
    <>
      <SiteName />
      {isPlaceForm && <CreatePlaceForm telegram_user_id={telegram_user_id} />}

      {pageState === "place" && (
        <div className="p-2">
          {/* TODO: есть ли элементы в списке data.length не работает */}
          {data ? (
            data.map((place) => <PlaceItem key={place.id} place={place} />)
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
