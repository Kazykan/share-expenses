import { Tab } from "@headlessui/react"
import { useEffect, useMemo, useState } from "react"
import { IWebApp } from "./telegram/t.types"
import ModalForm from "./components/forms/ModalForm"
import Navbars from "./components/screens/Navbars"
import PlaceList from "./components/itemList/PlaceList"
import MemberList from "./components/itemList/MemberList"
import ExpenseList from "./components/itemList/ExpenseList"
import MoneyTransferList from "./components/itemList/MoneyTransferList"
import DeptAdviceList from "./components/itemList/DeptAdviceList"

export function App() {
  const tableName = ["Расходы", "Долг", "Участники", "Переводы"]
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [placeId, setPlaceId] = useState<number>(0)
  const [isModalForm, setIsModalForm] = useState<boolean>(false)
  const [IdTelegramApp, setIdTelegramApp] = useState<number | undefined>(
    undefined
  )
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    console.log(`state is `, IdTelegramApp)
  }, [IdTelegramApp])

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
    if (typeof tg.user?.id === "number") {
      setIdTelegramApp((_) => tg.user?.id)
    }
  }, [webApp?.initDataUnsafe?.user?.id])

  return (
    <>
      {/* Окно в telegram на весь экран */}
      {tg && tg.tg?.expand()}

      <Navbars setIsModalForm={setIsModalForm} />

      {isModalForm && selectedIndex != 1 ? (
        <ModalForm
          setIsModalForm={setIsModalForm}
          telegramUserId={IdTelegramApp}
          placeId={placeId}
          selectedIndex={selectedIndex}
        />
      ) : (
        ""
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
            <Tab.Panel>
              <ExpenseList placeId={placeId} />
            </Tab.Panel>
            <Tab.Panel>
              <DeptAdviceList placeId={placeId} />
            </Tab.Panel>
            <Tab.Panel>
              <MemberList placeId={placeId} />
            </Tab.Panel>
            <Tab.Panel>
              <MoneyTransferList placeId={placeId} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <>
          {typeof tg.user?.id === "number" && (
            <PlaceList
              IdTelegramApp={tg.user?.id}
              setPlaceId={setPlaceId}
              telegram_username={tg.user?.username}
            />
          )}

          {/* Расcкоменторовать добавить для тестов свой id */}
          {/* <PlaceList
              IdTelegramApp={172457394}
              setPlaceId={setPlaceId}
              telegram_username={tg.user?.username}
            /> */}
        </>
      )}
      {/* <DatePickerExample /> */}
    </>
  )
}

export default App
