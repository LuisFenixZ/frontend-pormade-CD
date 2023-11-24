import { useContext } from "react"
import { AuthContext } from "./contexts/useAuth"
import { Navigate, Outlet } from "react-router-dom"


export const PrivateRoute = () => {
    const { signed } = useContext(AuthContext)

    const adminToken = localStorage.getItem("adminToken")

    return signed || adminToken? <Outlet /> : <Navigate to="/login" />

}