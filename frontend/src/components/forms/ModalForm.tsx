import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import CreatePlaceForm from "./CreatePlaceForm"
import { setIsModalFormTUserIdProps } from "../models/props.model"
import CreateMemberForm from "./CreateUserForm"
import CreateExpenseForm from "./CreateExpenseForm"
import CreateMoneyTransferForm from "./CreateMoneyTransferForm"

export default function ModalForm({
  setIsModalForm,
  telegramUserId,
  placeId,
  selectedIndex,
}: setIsModalFormTUserIdProps) {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalForm((prev) => !prev)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-[#FEFDF8] dark:bg-[#3D3A37] p-6 text-left align-middle shadow transition-all dark:text-[#A7A29D] text-[#574938]">

                  {/* <div className="mt-1 text-sm dark:text-[#A7A29D] text-[#574938]">
                  </div> */}

                  {placeId && selectedIndex == 0 ? (
                    <CreateExpenseForm
                      placeId={placeId}
                      setIsModalForm={setIsModalForm}
                    />
                  ) : undefined}
                  {placeId && selectedIndex == 2 ? (
                    <CreateMemberForm
                      placeId={placeId}
                      setIsModalForm={setIsModalForm}
                    />
                  ) : undefined}
                  {placeId && selectedIndex == 3 ? (
                    <CreateMoneyTransferForm
                      placeId={placeId}
                      setIsModalForm={setIsModalForm}
                    />
                  ) : undefined}
                  {placeId == 0 && (
                    <CreatePlaceForm
                      telegramUserId={telegramUserId}
                      setIsModalForm={setIsModalForm}
                    />
                  )}
{/* 
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded border border-transparent dark:bg-[#B7D29F] bg-[#D0EFB3] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#79a54f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalForm((prev) => !prev)}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

// {/* <Transition appear show={true} as={Fragment}>
//   <Dialog
//     as="div"
//     className="relative z-10"
//     onClose={() => setIsModalForm((prev) => !prev)}
//   >
//     <Transition.Child
//       as={Fragment}
//       enter="ease-out duration-300"
//       enterFrom="opacity-0"
//       enterTo="opacity-100"
//       leave="ease-in duration-200"
//       leaveFrom="opacity-100"
//       leaveTo="opacity-0"
//     >
//       <div className="fixed inset-0 bg-black/25" />
//     </Transition.Child>

//     <div className="">
//       {/* <div className="flex min-h-full items-center justify-center p-4 text-center"> */}
//       {/* <div className="fixed top-0 left-0 overflow-auto w-full h-full rounded bg-white p-8 m-2 text-[#574938] shadow"> */}
//       <div className="fixed justify-center items-center bg-white w-full p-8">
//       {/* <div className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-[#574938] shadow"> */}
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           {/* <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray p-6 text-left align-middle shadow-xl transition-all"> */}
//           <Dialog.Panel className="">
//             {/* <Dialog.Title
//               as="h3"
//               className="text-lg font-medium leading-6 text-gray-900"
//             >
//               Добавить место
//             </Dialog.Title> */}
//             {placeId && selectedIndex == 0 ? (
//               <CreateExpenseForm
//                 placeId={placeId}
//                 setIsModalForm={setIsModalForm}
//               />
//             ) : undefined}
//             {placeId && selectedIndex == 2 ? (
//               <CreateMemberForm
//                 placeId={placeId}
//                 setIsModalForm={setIsModalForm}
//               />
//             ) : undefined}
//             {placeId && selectedIndex == 3 ? (
//               <CreateMoneyTransferForm
//                 placeId={placeId}
//                 setIsModalForm={setIsModalForm}
//               />
//             ) : undefined}
//             {placeId == 0 && (
//               <CreatePlaceForm
//                 telegramUserId={telegramUserId}
//                 setIsModalForm={setIsModalForm}
//               />
//             )}

//             {/* <div className="mt-4">
//               <button
//                 type="button"
//                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                 onClick={() => setIsModalForm((prev) => !prev)}
//               >
//                 Отмена
//               </button>
//             </div> */}
//           </Dialog.Panel>

//         </Transition.Child>
//       </div>
//     </div>
//   </Dialog>
// </Transition> */}
