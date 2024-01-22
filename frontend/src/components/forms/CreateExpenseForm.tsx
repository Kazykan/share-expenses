import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Expense } from "../models/expense.model"
import { setIsModalFormProps } from "../models/props.model"
import convertUserForSelectForm from "../../services/convertUserForSelectForm.service"
import { useUsersQuery } from "../../hooks/useUsersQuery"
import { ExpenseService } from "../../services/expense.service"
import { IoCloseSharp } from "react-icons/io5"
import { ListBoxItem } from "react-aria-components"
import { Select } from "../screens/select"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
// import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';

const CreateExpenseForm = ({
  setIsModalForm,
  placeId,
}: setIsModalFormProps) => {
  type Inputs = {
    name: string
    cost: number
    date: string
  }

  const [whoPaidMemberId, setWhoPaidMemberId] = useState<any>("123")

  const { data: dataUsers } = useUsersQuery(placeId!)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  })

  const testData = convertUserForSelectForm(dataUsers)

  // const getValue = (value: number) =>
  //   value ? testData.find((user) => user.value === value) : ""

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
    mutation.mutate({
      ...data,
      place_id: placeId,
      who_paid_member_id: whoPaidMemberId,
    })

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-[#111827] dark:text-[#A7A29D]"
      >
        <div className="flex pb-8 items-center justify-between">
          Добавить трату
          <button onClick={() => setIsModalForm((prev) => !prev)}>
            <IoCloseSharp className="text-xl" />
          </button>
        </div>
      </Dialog.Title>
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div>
          <label>Название траты</label>
          <div className="text-red-500">
            {errors?.name && <p>{errors.name.message || "Error!"}</p>}
          </div>
          <input
            {...register("name", {
              required: "Введите название траты",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
              maxLength: {
                value: 25,
                message: "Максимум 25 символов",
              },
            })}
            className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="name"
            type="text"
          />

          <label>Стоимость</label>
          <div className="text-red-500">
            {errors?.cost && <p>{errors.cost.message || "Введите положительное число!"}</p>}
          </div>
          <input
            {...register("cost", { required: "Введите стоимость траты",
          validate: (value) => value >0 })}
            className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="cost"
            type="number"
          />
          <label>Дата покупки</label>
          <input
            {...register("date", { required: true })}
            className="mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="date"
            type="date"
            defaultValue={new Date().toISOString().substr(0, 10)}
          />
          <label className="mb-1">Кто оплатил</label>
          <Select
            description=""
            // isOpen={true}
            items={testData}
            selectedKey={whoPaidMemberId}
            onSelectionChange={(selected) => setWhoPaidMemberId(selected)}
          >
            {(item) => <ListBoxItem id={item.value}>{item.label}</ListBoxItem>}
          </Select>

          {/* <Controller
            control={control}
            name="who_paid_member_id"
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                // className={{
                //   control: () => 'shadow'
                // }}
                placeholder=""
                options={testData}
                value={getValue(value)}
                menuIsOpen={false}
                onChange={(newValue) =>
                  onChange((newValue as IUserSelectProps).value)
                }
              />
            )}
          /> */}
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

export default CreateExpenseForm
