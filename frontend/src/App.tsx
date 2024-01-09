import { Tab } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { IWebApp } from "./telegram/t.types"
import PlaceForm from "./components/forms/PlaceForm"
import MoneyLogo from "./components/svg/money"
import Navbars from "./components/screens/Navbars"
import PlaceList from "./components/itemList/PlaceList"

export function App() {
  const tableName = ["Расходы", "Долг", "Участники", "Переводы"]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [placeId, setPlaceId] = useState<number>(0)
  const [isModalForm, setIsModalForm] = useState<boolean>(true)
  const [IdTelegramApp, setIdTelegramApp] = useState<number | undefined>(
    172457394
  )
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
  }, [webApp?.initDataUnsafe?.user?.id])

  return (
    <>
      {/* Окно в telegram на весь экран */}
      {tg && tg.tg?.expand()}
      {/* {tg.user?.first_name} {tg.user?.id} */}
      <Navbars setIsModalForm={setIsModalForm} />
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
            {tg.user?.username} Разделите расходы в поездках и
            мероприятиях. Добавьте место для начало работы.
          </p>
          {typeof tg.user?.id === "number" && (
            <PlaceList IdTelegramApp={IdTelegramApp} setPlaceId={setPlaceId} telegram_username={tg.user?.username}/>
          )}
        </>
      )}
    </>
  )
}

export default App
