import { Tab } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { IWebApp } from "./telegram/t.types"
import SiteName from "./components/screens/home/SiteName"
import { useQueryClient } from "@tanstack/react-query"
import { useTUser } from "./hooks/t.user.queries"
import { axiosInstance } from "./services/api"
import { TelegramUser } from "./components/models/telegramuser.model"

export function App() {
  const tableName = ["Расходы", "Долг", "Участники", "Переводы"]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [placeId, setPlaceId] = useState<number>(0)
  // const [isModalForm, setIsModalForm] = useState<boolean>(false)
  const [IdTelegramApp, setIdTelegramApp] = useState<number | undefined>(
    undefined
  )
  const TUserQuery = useTUser(IdTelegramApp)

  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp
    if (telegram) {
      telegram.ready()
      setWebApp(telegram)
    }
  }, [])

  const tg = useMemo(() => {
    return webApp
      ? {
          tg: webApp,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  useEffect(() => {
    if (typeof tg.tg?.initDataUnsafe?.user?.id === "number") {
      setIdTelegramApp((_) => tg.tg?.initDataUnsafe?.user?.id)
    }
    // setIdTelegramApp((_) => 123)


  }, [webApp?.initDataUnsafe?.user?.id])

  // useEffect( () => {
  //   console.log(`change idTelegramApp to ${IdTelegramApp}`)
  //   queryClient.invalidateQueries({ queryKey: ["telegram_user"] })
  // }, [IdTelegramApp])


  return (
    <>
      {/* Окно в telegram на весь экран */}
      {tg && tg.tg?.expand()}
      {tg.user?.first_name}
      <SiteName />
      {IdTelegramApp}
      <p>
        {TUserQuery?.data?.id} {TUserQuery?.data?.telegram_user_id}{" "}
        {TUserQuery?.data?.username}
      </p>
      {placeId ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            {tableName.map((tabName, index) => (
              <Tab
                key={index}
                className="inline-block p-4 border-b-2 ui-not-selected:border-transparent rounded-t-lg ui-not-selected:hover:text-gray-600 ui-not-selected:hover:border-gray-300 ui-not-selected:dark:hover:text-gray-300 ui-selected:text-blue-600 ui-selected:border-blue-600 ui-selected:active ui-selected:dark:text-blue-500 ui-selected:dark:border-blue-500"
              >
                {tabName}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>ExpenseList</Tab.Panel>
            <Tab.Panel>DeptAdviceList</Tab.Panel>
            <Tab.Panel>UserList</Tab.Panel>
            <Tab.Panel>MoneyTransferList</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        ""
      )}
      {/* <button
        className="absolute bottom-5 right-5 rounded-full bg-blue-200 text-white text-2xl px-4 py-1 font-bold"
        onClick={() => setIsModalForm((prev) => !prev)}
      >
        +
      </button> */}
    </>
  )
}

export default App
