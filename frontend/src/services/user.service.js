import axios from "axios"

export const UserService = {
  async get(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/`
    )
    return response
  },

  async getAll(id) {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/Expense/?place=${id}`
    )

    return response.data
  },

  create(data) {
    return axios.post("http://127.0.0.1:8000/api/v1/User/", data)
  },

  delete(id) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/User/${id}/`)
  },
}
