import { IPlace } from "../../models"

interface PlaceProps {
  place: IPlace
}

export function Place({ place: place }: PlaceProps) {

  return (
    <div className="border py-2 px-2 rounded flex flex-col items-center mb-2">
      <p>{place.name}</p>
    </div>
  )
}


// export function Place({ place: place }: PlaceProps) {

//   return (
//     <>
//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           {place.telegram_user_id}
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">{place.name}</a>
//         </h3>
//       </div>
//     </>
//   )
// }

// /* <section className="bg-white dark:bg-gray-900 antialiased">
// <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
//   <div className="max-w-3xl mx-auto text-center">
//     <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
//       Schedule
//     </h2>

//   </div>

//   <div className="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
//     <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">

//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           {place.telegram_user_id}
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">{place.name}</a>
//         </h3>
//       </div>

//       <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
//         <p className="w-32 text-lg font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
//           09:00 - 10:00
//         </p>
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           <a href="#" className="hover:underline">Bergside LLC: Controlling the video traffic flows</a>
//         </h3>
//       </div>
//     </div>
//   </div>
// </div>
// </section> */