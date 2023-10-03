import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.155.24:3001"
})

export default api;