import { useEffect, useState } from "react"
import { IExpense } from "../models"
import axios from "axios"


export function useExpense(place_id: number) {
  const [expense, setExpense] = useState<IExpense[]>([])

  async function fetchUser(place_id: number) {
    const response = await axios.get<IExpense[]>(
      `http://127.0.0.1:8000/api/v1/Expense/?place=${place_id}`
    )
    setExpense(response.data)
  }

  useEffect(() => {
    fetchUser(place_id)
  }, [])
  return { expense: expense }
}
