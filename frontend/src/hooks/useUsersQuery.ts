import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user.service"

const useUsersQuery = (placeId: number) => {
  return useQuery({
    queryFn: () => UserService.getAll(placeId),
    queryKey: ["members", placeId],
  })
}

export { useUsersQuery }
