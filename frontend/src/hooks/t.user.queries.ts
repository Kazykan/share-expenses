import { useQuery } from "@tanstack/react-query";
import { TUserService } from "../services/telegram.user.service";

export function useTUser(IdTelegramApp: number | undefined) {
    return useQuery({
        queryKey: ["telegram", IdTelegramApp],
        queryFn: async () => TUserService.get(IdTelegramApp),
    })
}


