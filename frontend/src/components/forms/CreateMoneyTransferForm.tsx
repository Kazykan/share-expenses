import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import ReactSelect from "react-select"
import { useUsersQuery } from "../../hooks/useUsersQuery"
import { MoneyTransfer } from "../models/moneyTransfer.model"
import { MoneyTransferService } from "../../services/moneyTransfer.service"
import convertUserForSelectForm from "../../services/convertUserForSelectForm.service"
import { setIsModalFormProps } from "../models/props.model"
import { IoCloseSharp } from "react-icons/io5"
import { Dialog } from "@headlessui/react"
import { Select } from "../screens/select"
import { useState } from "react"
import { ListBoxItem } from "react-aria-components"
import { ModalButton } from "../screens/button/ModalButton"

const CreateMoneyTransferForm = ({
  placeId,
  setIsModalForm,
}: setIsModalFormProps) => {
  const [whoPaidMemberId, setWhoPaidMemberId] = useState<any>("123")
  const [whoGotMemberId, setWhoGotMemberId] = useState<any>("123")

  const { data: dataUsers } = useUsersQuery(placeId!)

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  })

  const userData = convertUserForSelectForm(dataUsers)

  // const getValue = (value: number) =>
  //   value ? userData.find((user) => user.value === value) : ""

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: MoneyTransfer) => MoneyTransferService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyTransfers"] })
      reset()
      setIsModalForm((prev) => !prev)
    },
  })

  const onSubmit = (data: any) =>
    mutation.mutate({
      ...data,
      place_id: placeId,
      who_got_member_id: whoGotMemberId,
      who_paid_member_id: whoPaidMemberId,
    })

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-[#111827] dark:text-[#A7A29D]"
      >
        <div className="flex pb-8 items-center justify-between">
          Добавить перевод
          <button onClick={() => setIsModalForm((prev) => !prev)}>
            <IoCloseSharp className="text-xl" />
          </button>
        </div>
      </Dialog.Title>
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <div>
          <label>Стоимость</label>
          <input
            {...register("amount", { required: true })}
            className="peer mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="amount"
            type="number"
          />
          <label>Дата перевода</label>
          <input
            {...register("date", { required: true })}
            className="mt-1 mb-5 py-2 ps-3 block w-full bg-[#EFEAE4] border-transparent rounded  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#262019] dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            id="date"
            type="date"
          />
          <label className="mb-1">Кто оплатил</label>
          <Select
            description=""
            // isOpen={true}
            items={userData}
            selectedKey={whoPaidMemberId}
            onSelectionChange={(selected) => setWhoPaidMemberId(selected)}
          >
            {(item) => <ListBoxItem id={item.value}>{item.label}</ListBoxItem>}
          </Select>

          <label className="mb-1">Кто получил</label>
          <Select
            description=""
            // isOpen={true}
            items={userData}
            selectedKey={whoGotMemberId}
            onSelectionChange={(selected) => setWhoGotMemberId(selected)}
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
        <ModalButton setIsModalForm={setIsModalForm} />
      </form>
    </>
    // <form className="py-2 px-" onSubmit={handleSubmit((e) => onSubmit(e))}>
    //   <div className="mb-4">
    //     <input
    //       {...register("amount", { required: true })}
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="amount"
    //       type="number"
    //       placeholder="Стоимость"
    //     />
    //     <input
    //       {...register("date", { required: true })}
    //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //       id="date"
    //       type="date"
    //       placeholder="Дата покупки"
    //     />
    //     Кто оплатил
    //     <Controller
    //       control={control}
    //       name="who_paid_member_id"
    //       rules={{
    //         required: "Обязательное поле",
    //       }}
    //       render={({ field: { onChange, value } }) => (
    //         <ReactSelect
    //           placeholder="Кто оплатил"
    //           options={userData}
    //           value={getValue(value)}
    //           onChange={(newValue) =>
    //             onChange((newValue as IUserSelectProps).value)
    //           }
    //         />
    //       )}
    //     />
    //     Кто получил
    //     <Controller
    //       control={control}
    //       name="who_got_member_id"
    //       rules={{
    //         required: "Обязательное поле",
    //       }}
    //       render={({ field: { onChange, value } }) => (
    //         <ReactSelect
    //           placeholder="Кто получил"
    //           options={userData}
    //           value={getValue(value)}
    //           onChange={(newValue) =>
    //             onChange((newValue as IUserSelectProps).value)
    //           }
    //         />
    //       )}
    //     />
    //   </div>
    //   <div className="flex items-center justify-center mb-4">
    //     <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
    //       Ok
    //     </button>
    //   </div>
    // </form>
  )
}

export default CreateMoneyTransferForm
