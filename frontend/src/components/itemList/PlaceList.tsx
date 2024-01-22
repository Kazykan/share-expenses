import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PlaceListProps } from "../../interface"
import { Place } from "../models/place.model"
import { PlaceService } from "../../services/place.service"
import { useTUser } from "../../hooks/t.user.queries"
import { usePlacesQuery } from "../../hooks/places.query"
import { WebAppUser } from "../models/telegramuser.model"
import { TUserService } from "../../services/telegram.user.service"
import { CiEdit, CiTrash } from "react-icons/ci"

function delay(timeout: number) {
  return new Promise((r) => setTimeout(r, timeout))
}

export default function PlaceList({
  IdTelegramApp,
  setPlaceId,
  telegram_username,
}: PlaceListProps) {
  const queryClient = useQueryClient()
  const { data: TUserQuery } = useTUser(IdTelegramApp)
  const { data: dataPlaces } = usePlacesQuery(IdTelegramApp)

  const handleCreateTelegramUser = () => {
    mutationTelegram.mutate({
      telegram_user_id: IdTelegramApp!,
      username: telegram_username ?? "",
    })
    // Делаем задержку и полностью перезапускаем страницу, т.к. я не нашел другого способа т.к. IdTelegramApp не обновляется
    delay(10000)
    window.location.reload()
  }

  const mutation = useMutation({
    mutationFn: (id: number) => PlaceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
    },
  })

  const mutationTelegram = useMutation({
    mutationFn: (data: WebAppUser) => TUserService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telegram", "places"] })
      console.log("delay_befor")
      delay(50000)
      console.log("delay_after")
    },
    onError: () => {
      delay(50000)
      console.log("delay_5000")
    },
  })

  return (
    <>
      {/* Если Id не определен, а если определен то смотрим есть ли такой пользователь в БД, если нет запускаем его создание */}
      {TUserQuery?.length !== 0 && IdTelegramApp !== undefined ? (
        <div className="px-2">
          {dataPlaces?.length ? (
            <div className="py-3">
              <div className="mx-auto max-w-sm space-y-4 rounded-lg p-4">
                {dataPlaces.map((place: Place) => (
                  <div
                    className="px-3 py-3 rounded dark:bg-[#3D3A37] bg-white text-[#32371C] dark:text-[#D5D0CA] shadow"
                    key={place.id}
                  >
                    <div className="flex justify-between">
                      <div>
                        <a
                          href="#"
                          onClick={() => setPlaceId(place.id!)}
                          className="hover:text-[#B2EDEE] dark:hover:text-[#8EBCBD]"
                        >
                          {place.name}
                        </a>
                      </div>
                      <div className="text-lg space-x-5">
                        <button className="rounded px-2 py-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]">
                          <CiEdit />
                        </button>
                        <button
                          className="rounded px-2 py-1 hover:bg-gray-200 dark:focus:bg-[#597A7A] dark:hover:bg-[#8EBCBD]"
                          onClick={() => mutation.mutate(place.id!)}
                        >
                          <CiTrash />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-[#A7A29D]">
                        3 участника, общий баланс: 13 000 $
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <img
                src={"./Share-expenses_add_place.png"}
                className="px-6 py-1"
              />

              <p className="p-3 mt-1 text-sm text-[#32371C] dark:text-[#D5D0CA] text-center">
                {telegram_username} Разделите расходы в поездках и мероприятиях.
                Добавьте место для начало работы.
              </p>
            </>
          )}

        </div>
      ) : (
        <>
          {handleCreateTelegramUser()}
        </>
      )}
    </>
  )
}
