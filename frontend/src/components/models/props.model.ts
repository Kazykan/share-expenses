export interface setIsModalFormProps {
  setIsModalForm: React.Dispatch<React.SetStateAction<boolean>>
  placeId?: number
}

export interface setIsModalFormTUserIdProps {
  setIsModalForm: React.Dispatch<React.SetStateAction<boolean>>
  telegramUserId: number | undefined
  placeId?: number
  selectedIndex?: number
}

export interface IUserSelectProps {
  value: number
  label: string
}
