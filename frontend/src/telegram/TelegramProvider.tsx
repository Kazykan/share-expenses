import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react"
import { IWebApp, WebAppUser } from "./t.types"

interface TelegramContext {
  tg?: IWebApp
  user?: WebAppUser
}

export const TelegramContext = createContext<TelegramContext>({})

const TelegramProvider: FC<PropsWithChildren> = ({ children }) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const telegram = (window as any).Telegram.WebApp
    if (telegram) {
      telegram.ready()
      setWebApp(telegram)
    }
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          tg: webApp,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}

export { TelegramProvider }