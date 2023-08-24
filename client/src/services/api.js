import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.92.170:3001"
})

export default api;