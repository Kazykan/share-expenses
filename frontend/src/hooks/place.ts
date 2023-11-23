import { useEffect, useState } from "react"
import { IPlace } from "../models"
import axios, { AxiosError } from "axios"

export function usePlace() {
  const [place, setPlace] = useState<IPlace[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function addPlace(place: IPlace) {
    setPlace((prev) => [...prev, place])
  }

  async function fetchPlace() {
    try {
      setError("")
      setLoading(true)
      const response = await axios.get<IPlace[]>(
        "http://127.0.0.1:8000/api/v1/Place/"
      )
      setPlace(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchPlace()
  }, [])
  return { places: place, error, loading, addPlace }
}
