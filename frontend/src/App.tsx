import { Tab, Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import ExpenseList from "./components/itemList/ExpenseList"
import SiteName from "./components/screens/home/SiteName"
import  UserList from "./components/itemList/UserList"
import ExpenseForm from "./components/forms/ExpenseForm"
import MoneyTransferList from "./components/itemList/MoneyTransferList"

export function App() {
  const tableName = ["Расходы", "Баланс", "Участники", "Переводы"]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [placeId, setPlaceId] = useState(1)
  const [isModalForm, setIsModalForm] = useState<boolean>(false)

  return (
    <>
      <SiteName />
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          {tableName.map((tabName) => (
            <Tab className="inline-block p-4 border-b-2 ui-not-selected:border-transparent rounded-t-lg ui-not-selected:hover:text-gray-600 ui-not-selected:hover:border-gray-300 ui-not-selected:dark:hover:text-gray-300 ui-selected:text-blue-600 ui-selected:border-blue-600 ui-selected:active ui-selected:dark:text-blue-500 ui-selected:dark:border-blue-500">
              {tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ExpenseList placeId={placeId} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>
            <UserList placeId={placeId} />
          </Tab.Panel>
          <Tab.Panel>
            <MoneyTransferList placeId={placeId} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {isModalForm && (
        <ExpenseForm setIsModalForm={setIsModalForm} placeId={placeId} />
      )}

      <button
        className="absolute bottom-5 right-5 rounded-full bg-blue-200 text-white text-2xl px-3 py-1"
        onClick={() => setIsModalForm((prev) => !prev)}
      >
        +
      </button>
    </>
  )
}

export default App
