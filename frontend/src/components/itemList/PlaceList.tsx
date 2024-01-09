import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PlaceListProps } from "../../interface"
import { Place } from "../models/place.model"
import { PlaceService } from "../../services/place.service"
// import { useOneTelegramUserQuery } from "../../hooks/useOneTelegramUserQuery"
// import CreateTelegramUserForm from "../forms/CreateTelegramUserForm"
import { useEffect } from "react"
import { useTUser } from "../../hooks/t.user.queries"
import { TUserService } from "../../services/telegram.user.service"
import { TelegramUser } from "../models/telegramuser.model"
import { usePlacesQuery } from "../../hooks/places.query"

export default function PlaceList({
  IdTelegramApp,
  setPlaceId,
  telegram_username,
}: PlaceListProps) {
  const queryClient = useQueryClient()
  const TUserQuery = useTUser(IdTelegramApp)
  const { data: dataPlaces } = usePlacesQuery(IdTelegramApp)

  useEffect(() => {
    // Если пользователя нет создаем его в БД
    if (TUserQuery.data === undefined && IdTelegramApp !== undefined) {
      const data: TelegramUser = {
        telegram_user_id: IdTelegramApp ?? 0,
        username: telegram_username ?? "",
      }
      TUserService.create(data)
      queryClient.invalidateQueries({ queryKey: ["telegram_user"] })
    }
  }, [TUserQuery.data?.id])

  const mutation = useMutation({
    mutationFn: (id: number) => PlaceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
    },
  })

  return (
    <>
      <div className="px-4">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {TUserQuery.data?.id &&
            dataPlaces?.map((place: Place) => (
              <li className="mb-6 ms-4 pt-2" key={place.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div className="mb-2 flex justify-between text-l font-semibold text-gray-900 dark:text-white">
                  <div>
                    <button onClick={() => setPlaceId(place.id!)}>
                      {place.name}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div>
                    {place.id && (
                      <a
                        href="#"
                        className="inline-block px-2 py-0.5 text-sm font-sm rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
                        onClick={() => mutation.mutate(place.id!)}
                      >
                        Удалить
                      </a>
                    )}{" "}
                    Ред.
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </>
  )
}
