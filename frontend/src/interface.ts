export interface PlaceIdProps {
  placeId: number
}

export interface PlaceListProps {
  IdTelegramApp: number | undefined
  setPlaceId: React.Dispatch<React.SetStateAction<number>>
  telegram_username: string | undefined
}

export interface CreateTUserProps {
  telegramUserId: number
  telegram_username: string | undefined
}
