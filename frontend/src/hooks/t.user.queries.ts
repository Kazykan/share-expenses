import { useQuery } from "@tanstack/react-query";
import { TUserService } from "../services/telegram.user.service";

export function useTUser(id_telegram_app: number | undefined) {
    return useQuery({
        queryKey: ["telegram_user", id_telegram_app],
        queryFn: async () => TUserService.get(id_telegram_app),
    })
}