import { useQuery } from "@tanstack/react-query"
import { PlaceService } from "../services/place.service"

const usePlacesQuery = (telegramUserId: number | undefined) => {
  return useQuery({
    queryFn: () => PlaceService.getAll(telegramUserId),
    queryKey: ["places"],
  })
}

export { usePlacesQuery }
