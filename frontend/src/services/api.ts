import axios from "axios"

const BASE_URL = "https://api.kocherbaev.ru/api/v1/"
export const axiosInstance = axios.create({ baseURL: BASE_URL })



