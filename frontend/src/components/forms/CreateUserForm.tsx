import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Member } from "../models/user.model"
import { UserService } from "../../services/user.service"
import { setIsModalFormProps } from "../models/props.model"

const CreateUserForm = ({ placeId, setIsModalForm }: setIsModalFormProps) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  })

  const mutation = useMutation({
    mutationFn: (data: Member) => UserService.create(data),
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
      <div className="text-lg font-medium leading-6 text-gray-900">
        Добавить участника
      </div>
      <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div className="mb-4">
          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Название траты"
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
            Ok
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateUserForm
