import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Place } from "../models/place.model"
import { setIsModalFormTUserIdProps } from "../models/props.model"
import { PlaceService } from "../../services/place.service"
import { Dialog } from "@headlessui/react"
import { IoCloseSharp } from "react-icons/io5"
import { ModalButton } from "../screens/button/ModalButton"

const CreatePlaceForm = ({
  telegramUserId,
  setIsModalForm,
}: setIsModalFormTUserIdProps) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  })

  const mutation = useMutation({
    mutationFn: (data: Place) => PlaceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] })
      reset()
      setIsModalForm((prev) => !prev)
    },
  })

  const onSubmit = (data: any) =>
    mutation.mutate({ ...data, web_app_user_id: telegramUserId })

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-[#111827] dark:text-[#A7A29D]"
      >
        <div className="flex pb-8 items-center justify-between">
          Добавить мероприятие
          <button onClick={() => setIsModalForm((prev) => !prev)}>
            <IoCloseSharp className="text-xl" />
          </button>
        </div>
      </Dialog.Title>
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div>
          <label>Название мероприятия</label>
          <input
            {...register("name", { required: true })}
            className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="name"
            type="text"
          />
        </div>
        <ModalButton setIsModalForm={setIsModalForm} />
      </form>
    </>
  )
}

export default CreatePlaceForm
