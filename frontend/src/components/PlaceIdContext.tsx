import { createContext } from "react"

export const PlaceIdContext = createContext(0)

// import React, {
//   Dispatch,
//   SetStateAction,
//   useMemo,
//   useState,
//   createContext,
// } from "react"

// export const PlaceIdContext = createContext({})
// // const PlaceIdContext = createContext<IContext>({} as IContext)

// // Это чтобы React не ругался на просто {children}
// interface Props {
//   children: React.ReactNode
// }

// // interface IContext {
// //   palaceId: number
// //   setPlaceId: Dispatch<SetStateAction<number>>
// // }

// export const PlaceIdProvider = ({ children }: Props) => {
//   const [placeId, setPlaceId] = useState(0)

//   const placeIdValue = useMemo(
//     () => ({
//       placeId,
//       setPlaceId,
//     }),
//     [placeId]
//   )

//   return (
//     <PlaceIdContext.Provider value={placeId}>
//       {children}
//     </PlaceIdContext.Provider>
//   )
// }
