import { useForm } from "react-hook-form"
import { PlaceService } from "../../../../services/place.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const CreatePlaceForm = ({telegram_user_id}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const queryClient = useQueryClient()

  const  mutation = useMutation({
    mutationFn: (data) => PlaceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries('places')
      reset()
    },
  })

  const onSubmit = data => mutation.mutate({...data, telegram_user_id: telegram_user_id})


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-center font-bold">
        Новый расход
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Название
          </label>
          <input
          {...register('name', { required: true} )}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    </div>
  )
}

export default CreatePlaceForm
