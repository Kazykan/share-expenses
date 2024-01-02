export interface PlaceIdProps {
    placeId: number
  }

export interface PlaceListProps {
  telegramUserId: number
  setPlaceId: React.Dispatch<React.SetStateAction<number>>
  telegram_username: string | undefined
  }

export interface CreateTUserProps {
  telegramUserId: number
  telegram_username: string | undefined
  }
