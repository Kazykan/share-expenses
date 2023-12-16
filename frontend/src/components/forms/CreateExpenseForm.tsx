import {
  useForm,
  useController,
  UseControllerProps,
  Controller,
} from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ExpenseService } from "../../services/expense.service"
import { Expense } from "../models/expense.model"
import ReactSelect from "react-select"
import { User } from "../models/user.model"
import { PlaceIdProps } from "../../interface"
import { UserService } from "../../services/user.service"

const CreatePlaceForm = ({ placeId }: PlaceIdProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  type inputExpenseProps = {
    name: string
    cost: number
    date: string
    who_paid_user: number
  }

  interface IUserSelectProps {
    value: number
    label: string
  }

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAll(placeId),
  })

  function convertUserForSelectForm(dataUsers: User[]) {
    if (dataUsers) {
      const userLabels = dataUsers.map((user: User) => {
        const container = {
          value: user.id,
          label: user.username,
        }
        return container
      })
      return userLabels
    } else return []
  }

  const testData = convertUserForSelectForm(dataUsers)

  const getValue = (value: number) =>
    value ? testData.find((user) => user.value === value) : ""

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: Expense) => ExpenseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      reset()
    },
  })

  const onSubmit = (data: inputExpenseProps) =>
    mutation.mutate({ ...data, place: placeId })

  return (
    <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
      <div className="mb-4">
        <input
          {...register("name", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Название траты"
        />
        <input
          {...register("cost", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cost"
          type="number"
          placeholder="Стоимость"
        />
        <input
          {...register("date", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          placeholder="Дата покупки"
        />
        <Controller
          control={control}
          name="who_paid_user"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              placeholder="Кто оплатил"
              options={testData}
              value={getValue(value)}
              onChange={(newValue) =>
                onChange((newValue as IUserSelectProps).value)
              }
            />
          )}
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
