import { Place } from "./place.model"

export interface User {
  id: number
  username: string
  id_telegram: string | null
  place: number
}

export interface inputUserProps {
  username: string
  id_telegram: string | null
  place: number
}

