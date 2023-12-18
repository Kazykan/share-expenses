import { User } from "../components/models/user.model"

export default function convertUserForSelectForm(dataUsers: User[] | undefined) {
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