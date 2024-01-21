import { useEffect, useMemo, useState } from "react"
import { IWebApp } from "./telegram/t.types"
import ModalForm from "./components/forms/ModalForm"
import Navbars from "./components/screens/Navbars"
import PlaceList from "./components/itemList/PlaceList"

import { TabGroup } from "./components/screens/home/TabGroup"

export function App() {
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
      {placeId && !isModalForm ? (
        <TabGroup
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          placeId={placeId}
        />
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
            IdTelegramApp={911458411}
            setPlaceId={setPlaceId}
            telegram_username={tg.user?.username}
          /> */}
        </>
      )}

      {/* Не показывать кнопку в долгах и при открытии модального окна добавления */}
      {selectedIndex != 1 && !isModalForm ? (
        <button
          className="fixed bottom-0 right-0 mr-5 mb-20 rounded-full z-50 bg-[#597A7A] text-[#EFEAE4] text-2xl px-5 py-1 font-bold justify-center text-center"
          onClick={() => setIsModalForm((prev) => !prev)}
        >
          +
        </button>
      ) : (
        ""
      )}
    </>
  )
}

export default App
