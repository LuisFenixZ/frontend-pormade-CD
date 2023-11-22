import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.241.186:3003"
})

export default api;