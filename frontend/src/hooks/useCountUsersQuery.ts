import { useQuery } from "@tanstack/react-query"
import { MemberService } from "../services/user.service"
import { PlaceIdProps } from "../interface"

const useCountUsersQuery = (placeId: PlaceIdProps) => {
  return useQuery({
    queryFn: () => MemberService.count(placeId),
    queryKey: ["CountUsers", placeId],
  })
}

export { useCountUsersQuery }
