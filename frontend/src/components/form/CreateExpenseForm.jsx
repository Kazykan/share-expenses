import { useState } from "react"

export function CreateExpense({ setExpenses }) {
  const [data, setData] = useState({
    name: "",
    cost: "",
    date: "",
    who_paid_user: "",
  })

  const CreateExpense = (e) => {
    e.preventDefault()
    // console.log({ name, cost, dateExpense, whoPaidUser })
    console.log(data)
  }

  const tempData = [
    {
      id: 1,
      name: "Обед",
      cost: 125.0,
      date: "2023-11-22",
      who_paid_user: 1,
      place: 1,
    },
    {
      id: 2,
      name: "Ужин",
      cost: 500.0,
      date: "2023-11-23",
      who_paid_user: 3,
      place: 1,
    },
    {
      id: 3,
      name: "Отель",
      cost: 2000.0,
      date: "2023-11-21",
      who_paid_user: 2,
      place: 2,
    },
  ]

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-center font-bold">
        Новый расход
      </div>
      <form className="py-4 px-6" action="" method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Название
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Название траты"
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={data.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="number"
          >
            Стоимость
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cost"
            type="number"
            placeholder="Стоимость"
            onChange={(e) =>
              setData((prev) => ({ ...prev, cost: e.target.value }))
            }
            value={data.cost}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Select a date"
            onChange={(e) =>
              setData((prev) => ({ ...prev, date: e.target.value }))
            }
            value={data.date}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="service"
          >
            Оплатил(а)
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="service"
            onChange={(e) => setData(prev => ({...prev, who_paid_user: e.target.value}))}
            value={data.who_paid_user}
          >
            <option value="45">Руфат</option>
            <option value="1">Лукман</option>
            <option value="2">Masha</option>
            <option value="5">Boris</option>
          </select>
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={(e) => CreateExpense(e)}
          >
            Ok
          </button>
        </div>
      </form>
    </div>
  )
}
