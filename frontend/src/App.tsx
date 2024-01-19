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

      <Navbars />

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
          <Tab.List className="fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t border-gray-200 dark:bg-[#3D3A37] dark:border-[#A7A29D]">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium text-xs text-gray-500 dark:text-[#262019]">
              {/* <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium text-xs text-gray-500 dark:text-[#262019] group-hover:text-blue-600 dark:group-hover:text-[#8EBCBD]"> */}
              <Tab
                key="0"
                className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
                // className="ui-selected:transition-all inline-block p-4 border-b-2 ui-not-selected:border-transparent rounded ui-not-selected:hover:text-gray-600 ui-not-selected:hover:border-gray-300 ui-not-selected:dark:hover:text-gray-300 ui-selected:text-blue-600 ui-selected:border-blue-600 ui-selected:active ui-selected:dark:text-[#A7A29D] ui-selected:dark:border-blue-500"

                // className="inline-flex flex-col items-center justify-center px-2  group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-2 group"
                >
                  <BsCashCoin className="text-xl" />
                  <span>Расходы</span>
                </button>
              </Tab>
              <Tab
                key="1"
                // className="inline-flex flex-col items-center justify-center px-2 group"
                className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
              >
                <button
                  type="button"
                  // className="hover:transition-all inline-flex flex-col items-center justify-center px-2 hover:text-gray-50 dark:hover:text-[#A7A29D] active:text-gray-50 dark:active:text-[#A7A29D] group"
                  className="inline-flex flex-col items-center justify-center px-2"
                >
                  <FaMoneyBillTransfer className="text-xl " />
                  <span>Долг</span>
                </button>
              </Tab>
              <Tab
                key="2"
                className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-2"
                >
                  <IoPeopleSharp className="text-xl" />
                  <span>Участники</span>
                </button>
              </Tab>
              <Tab
                key="3"
                className="hover:transition-all duration-300 inline-block p-1 rounded ui-not-selected:hover:text-[#111827] ui-not-selected:dark:hover:text-[#A7A29D] ui-selected:text-[#111827] ui-selected:active ui-selected:dark:text-[#A7A29D]"

                // className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-2"
                >
                  <BiTransfer className="text-xl" />
                  <span>Переводы</span>
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

            {selectedIndex != 1 && 
            
      <button
        className="fixed bottom-0 right-0 mr-5 mb-20 rounded-full z-50 bg-[#597A7A] text-[#EFEAE4] text-2xl px-5 py-1 font-bold justify-center text-center"
        onClick={() => setIsModalForm((prev) => !prev)}
      >
        +
      </button>
            }

    </>
  )
}

export default App
