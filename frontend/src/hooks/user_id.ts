import { useEffect, useState } from "react"
import { IUser } from "../models"
import axios, { AxiosError } from "axios"

export function useUser_id(id: number) {
  const [user, setUser] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function addPlace(place: IUser) {
    setUser((prev) => [...prev, place])
  }

  async function fetchUser(id: number) {
    try {
      setError("")
      setLoading(true)
      const response = await axios.get<IUser[]>(
        `http://127.0.0.1:8000/api/v1/User/${id}`
      )
      setUser(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchUser(id)
  }, [])
  return { user: user, error, loading, addPlace }
}