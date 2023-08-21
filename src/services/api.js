import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.50.84:3001"
})

export default api;