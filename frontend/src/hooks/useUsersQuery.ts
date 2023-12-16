import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user.service"
import { PlaceIdProps } from "../interface"

const useUsersQuery = (placeId: PlaceIdProps) => {
  return useQuery({
    queryFn: () => UserService.getAll(placeId),
    queryKey: ["users"],
  })
}

export { useUsersQuery }
