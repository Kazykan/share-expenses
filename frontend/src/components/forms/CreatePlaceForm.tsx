import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Place } from "../models/place.model"
import { setIsModalFormTUserIdProps } from "../models/props.model"
import { PlaceService } from "../../services/place.service"

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
    <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
      <div className="mb-4">
        <input
          {...register("name", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Название поездки или события"
        />
      </div>
      <div className="flex items-center justify-center mb-4">
        <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
          Ok
        </button>
      </div>
    </form>
  )
}

export default CreatePlaceForm
