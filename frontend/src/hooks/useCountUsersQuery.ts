import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user.service"
import { PlaceIdProps } from "../interface"

const useCountUsersQuery = (placeId: PlaceIdProps) => {
  return useQuery({
    queryFn: () => UserService.count(placeId),
    queryKey: ["CountUsers", placeId],
  })
}

export { useCountUsersQuery }
