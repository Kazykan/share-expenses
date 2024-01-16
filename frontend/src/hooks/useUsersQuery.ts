import { useQuery } from "@tanstack/react-query"
import { MemberService } from "../services/user.service"

const useUsersQuery = (placeId: number) => {
  return useQuery({
    queryFn: () => MemberService.getAll(placeId),
    queryKey: ["members", placeId],
  })
}

export { useUsersQuery }
