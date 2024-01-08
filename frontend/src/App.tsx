import { Tab } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { IWebApp } from "./telegram/t.types"
import SiteName from "./components/screens/home/SiteName"
import { useTUser } from "./hooks/t.user.queries"
import PlaceForm from "./components/forms/PlaceForm"

export function App() {
  const tableName = ["Расходы", "Долг", "Участники", "Переводы"]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [placeId, setPlaceId] = useState<number>(0)
  const [isModalForm, setIsModalForm] = useState<boolean>(true)
  const [IdTelegramApp, setIdTelegramApp] = useState<number | undefined>(
    172457394
  )
  const TUserQuery = useTUser(IdTelegramApp)

  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp
    if (telegram) {
      telegram.ready()
      setWebApp(telegram)
    }
    setPlaceId(0) // Чтоб не было ошибок
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
    if (typeof tg.user?.id === "number") {
      setIdTelegramApp((_) => tg.user?.id)
    }
    // setIdTelegramApp((_) => 172457394)
  }, [webApp?.initDataUnsafe?.user?.id])

  return (
    <>
      {/* Окно в telegram на весь экран */}
      {tg && tg.tg?.expand()}
      {/* {tg.user?.first_name} {tg.user?.id} */}
      <SiteName />
      {/* {IdTelegramApp}
      {typeof IdTelegramApp} */}
      <p>
        {/* {TUserQuery && <>id: {TUserQuery.data?.id}</>} */}
        {/* {TUserQuery?.data?.telegram_user_id} {TUserQuery?.data?.username} */}
      </p>
      {isModalForm && (
        <PlaceForm
          setIsModalForm={setIsModalForm}
          telegramUserId={IdTelegramApp}
        />
      )}

      {/* Если нет placeId и определился tg.id */}
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
        <>
          <img src={"./Share-expenses_add_place.png"} className="px-6 py-1" />

          <p className="p-3 mt-1 text-sm text-gray-500 dark:text-gray-300">
            {TUserQuery?.data?.username} Разделите расходы в поездках и
            мероприятиях. Добавьте место для начало работы.
          </p>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => setIsModalForm((prev) => !prev)}
          >
            Добавить место
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m5 11 4-7" />
              <path d="m19 11-4-7" />
              <path d="M2 11h20" />
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
              <path d="m9 11 1 9" />
              <path d="M4.5 15.5h15" />
              <path d="m15 11-1 9" />
            </svg>
          </button>
        </>
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
