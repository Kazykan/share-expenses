import { PlaceService } from "../../../../services/place.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function PlaceItem({ place }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id) => PlaceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries("places")
      reset()
    },
  })

  return (
    <div className="relative flex flex-col max-w-2xl p-6 divide-y xl:flex-row xl:divide-y-0 xl:divide-x dark:bg-gray-900 dark:text-gray-100 dark:divide-gray-700">
      <div className="p-3 space-y-1">
        <h3 className="text-3xl font-semibold">{place.name}</h3>
      </div>
      <div className="flex items-center gap-3 p-3">
        <div className="space-y-1">
          <span className="text-xs">April 03, 2021</span>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-block px-2 py-1 text-sm font-semibold rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
            >
              Подробнее
            </a>
            <a
              href="#"
              className="inline-block px-2 py-1 text-sm font-semibold rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
              onClick={() => mutation.mutate(place.id)}
            >
              Удалить
            </a>
            <a
              href="#"
              className="inline-block px-2 py-1 text-sm font-semibold rounded-md bg-blue-200 dark:bg-violet-400 dark:text-gray-900"
            >
              Редактировать
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceItem
