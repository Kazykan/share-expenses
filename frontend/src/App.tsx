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
import { BsCashCoin } from "react-icons/bs"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { IoPeopleSharp } from "react-icons/io5"
import { BiTransfer } from "react-icons/bi"

export function App() {
  // const tableName = ["Расходы", "Долг", "Участники", "Переводы"]
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
          <Tab.List className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
              <Tab
                key="0"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  <BsCashCoin className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Расходы
                  </span>
                </button>
              </Tab>
              <Tab
                key="1"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  <FaMoneyBillTransfer className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Долг
                  </span>
                </button>
              </Tab>
              <Tab
                key="2"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  <IoPeopleSharp className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Участники
                  </span>
                </button>
              </Tab>
              <Tab
                key="3"
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                >
                  <BiTransfer className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Переводы
                  </span>
                </button>
              </Tab>
            </div>
          </Tab.List>
          {/* <Tab.List className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            {tableName.map((tabName, index) => (
              <Tab
                key={index}
                className="inline-block p-4 border-b-2 ui-not-selected:border-transparent rounded-t-lg ui-not-selected:hover:text-gray-600 ui-not-selected:hover:border-gray-300 ui-not-selected:dark:hover:text-gray-300 ui-selected:text-blue-600 ui-selected:border-blue-600 ui-selected:active ui-selected:dark:text-blue-500 ui-selected:dark:border-blue-500"
              >
                {tabName}
              </Tab>
            ))}
          </Tab.List> */}
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

      {/* <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <BsCashCoin className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Расходы
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaMoneyBillTransfer className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Долг
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <IoPeopleSharp className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Участники
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <BiTransfer className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Переводы
            </span>
          </button>
        </div>
      </div> */}
    </>
  )
}

export default App
