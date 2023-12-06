import axios from "axios"

export const PlaceService = {
  async getAll() {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/Place/?name=&telegram_user_id=1`
    )

    return response.data
  },

  create(data) {
    return axios.post("http://127.0.0.1:8000/api/v1/Place/", data)
  },

  delete(id) {
    return axios.delete(`http://127.0.0.1:8000/api/v1/Place/${id}`)
  },
}
