import { Member} from "../components/models/user.model"

export default function convertUserForSelectForm(dataUsers: Member[] | undefined) {
    if (dataUsers) {
      const userLabels = dataUsers.map((user: Member) => {
        const container = {
          value: user.id,
          label: user.username,
        }
        return container
      })
      return userLabels
    } else return []
  }