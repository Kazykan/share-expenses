import { useForm, Controller } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ReactSelect from "react-select"
import { PlaceIdProps } from "../../interface"
import { useUsersQuery } from "../../hooks/useUsersQuery"
import { MoneyTransfer } from "../models/moneyTransfer.model"
import { MoneyTransferService } from "../../services/moneyTransfer.service"
import convertUserForSelectForm from "../../services/convertUserForSelectForm.service"
import { IUserSelectProps, setIsModalFormProps } from "../models/props.model"

const CreateMoneyTransferForm = ({
  placeId,
  setIsModalForm,
}: setIsModalFormProps) => {
  const { data: dataUsers } = useUsersQuery(placeId)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const userData = convertUserForSelectForm(dataUsers)

  const getValue = (value: number) =>
    value ? userData.find((user) => user.value === value) : ""

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: MoneyTransfer) => MoneyTransferService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyTransfers"] })
      reset()
      setIsModalForm((prev) => !prev)
    },
  })

  const onSubmit = (data: MoneyTransfer) =>
    mutation.mutate({ ...data, place: placeId })

  return (
    <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
      <div className="mb-4">
        <input
          {...register("amount", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
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
        Кто оплатил
        <Controller
          control={control}
          name="who_paid_user"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              placeholder="Кто оплатил"
              options={userData}
              value={getValue(value)}
              onChange={(newValue) =>
                onChange((newValue as IUserSelectProps).value)
              }
            />
          )}
        />
        Кто получил
        <Controller
          control={control}
          name="who_gets_user"
          rules={{
            required: "Обязательное поле",
          }}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              placeholder="Кто получил"
              options={userData}
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

export default CreateMoneyTransferForm
