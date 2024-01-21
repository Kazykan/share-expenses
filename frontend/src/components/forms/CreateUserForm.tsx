import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Member } from "../models/user.model"
import { MemberService } from "../../services/user.service"
import { setIsModalFormProps } from "../models/props.model"
import { Dialog } from "@headlessui/react"
import { IoCloseSharp } from "react-icons/io5"

const CreateMemberForm = ({ placeId, setIsModalForm }: setIsModalFormProps) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  })

  const mutation = useMutation({
    mutationFn: (data: Member) => MemberService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      reset()
      setIsModalForm((prev) => !prev)
    },
  })

  const onSubmit = (data: any) =>
    mutation.mutate({ ...data, place_id: placeId, id_telegram: null })

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-[#111827] dark:text-[#A7A29D]"
      >
        <div className="flex pb-8 items-center justify-between">
          Добавить участника
          <button onClick={() => setIsModalForm((prev) => !prev)}>
            <IoCloseSharp className="text-xl" />
          </button>
        </div>
      </Dialog.Title>
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div>
          <label>Имя участника</label>
          <input
            {...register("username", { required: true })}
            className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="username"
            type="text"
          />
        </div>
        <div className="mt-8 text-right space-x-6">
          <button
            className="rounded px-4 py-2 text-sm font-medium text-[#262019] hover:text-[#79a54f]"
            onClick={() => setIsModalForm((prev) => !prev)}
          >
            Отмена
          </button>
          <button className="inline-flex justify-center rounded border border-transparent dark:bg-[#B7D29F] bg-[#D0EFB3] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#79a54f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            Ok
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateMemberForm
