import {
  useForm,
  Controller,
} from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ExpenseService } from "../../services/expense.service"
import { Expense } from "../models/expense.model"
import ReactSelect from "react-select"
import { useUsersQuery } from "../../hooks/useUsersQuery"
import convertUserForSelectForm from "../../services/convertUserForSelectForm.service"
import { IUserSelectProps, setIsModalFormProps } from "../models/props.model"

const CreateExpenseForm = ({ setIsModalForm, placeId }: setIsModalFormProps) => {
  const { data: dataUsers } = useUsersQuery(placeId)

  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: "onChange",
  })

  const testData = convertUserForSelectForm(dataUsers)

  const getValue = (value: number) =>
    value ? testData.find((user) => user.value === value) : ""

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: Expense) => ExpenseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
      reset()
      setIsModalForm((prev) => !prev)
    },
  })

  const onSubmit = (data: any) =>
    mutation.mutate({ ...data, place: placeId })

  return (
    <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
      <div className="mb-4">
        <input
          {...register("name", { required: true })}
          className="appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Название траты"
        />
        <input
          {...register("cost", { required: true })}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cost"
          type="number"
          placeholder="Стоимость"
        />
        <input
          {...register("date", { required: true })}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default CreateExpenseForm
