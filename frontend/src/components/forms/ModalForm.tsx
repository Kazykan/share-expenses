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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
