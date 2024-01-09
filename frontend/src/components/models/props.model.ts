export interface setIsModalFormProps {
  setIsModalForm: React.Dispatch<React.SetStateAction<boolean>>
  placeId?: number
}

export interface setIsModalFormTUserIdProps {
  setIsModalForm: React.Dispatch<React.SetStateAction<boolean>>
  telegramUserId: number | undefined
}

export interface IUserSelectProps {
  value: number
  label: string
}
