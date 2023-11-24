import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ authenticated, setAuthenticated] = useState(null);

  const signIn = async ({ email, password }) => {
    try {

        console.log(email);
        console.log(password);
  
        const response = await api.post("/canteen/admin", {
          email: email,
          password: password,
        });
        console.log(response);
  
        
        const { adminToken } = response.data;
  
        if (adminToken) {
          localStorage.setItem("adminToken", adminToken);
          setAuthenticated(true);
          console.log("Antes de navegar para /admin");
          Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success");
          return <Navigate to="/admin" />  
        } else {
          Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
        }
          
        
      } catch (error) {
        console.error("Erro ao executar a função handleLogin:", error);
        Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
      }
  };

  const singOut = () => {
    localStorage.removeItem('adminToken');
    setAuthenticated(null);
    return <Navigate to="/login" />
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        signIn,
        singOut,
        signed: !!authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
