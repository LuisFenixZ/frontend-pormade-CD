import React, { useState } from "react";
import Swal from "sweetalert2";
import './login-style.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'
import logo from "../../img-source/logo-cantina/Cantina Logo PetimColor WLP 1.png";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [is_admin, setIs_Admin] = useState(false);

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitação de login para o servidor
      const response = await api.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      // Verificar se o login foi bem-sucedido
      if (response.status === 200) {
        const {is_admin} = response.data;
        if (is_admin) {
          history('/mostra-produtos');
          Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success")
        } 
        else {
          history('/mostra-produtos2');
          Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success")
        }
        // Login bem-sucedido, redirecionar para a página principal
        
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitação de registro para o servidor
      const response = await api.post("/users/register", {
        email: registerEmail,
        password: registerPassword,
        is_admin: is_admin,
      });

      // Verificar se o registro foi bem-sucedido
      if (response.status === 200) {
        Swal.fire("Registro bem-sucedido", "Faça login para continuar", "success");
        setRegisterEmail("");
        setRegisterPassword("");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Erro ao registrar", "Verifique se o email já está cadastrado", "error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordRegisterVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  return (
    <main className="align-form">

    <div className="">
    <img className="img-logo" src={logo} alt="logo-cantina"></img>
        <form>
            <h2 className="cad__h2__title">Faça o Login</h2>
          
                    <p className="par">Usuário</p>
                    <div className="input">    
                        <input type="text" name="emailLogin" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="inputCamp"  />
                    </div>
                  
                    <p className="par">Senha</p>
                    <div className="select__options">
                      
                        <div className="select__options__category">

                        <input type={showPassword ? "text" : "password"} name="passwordLogin" 
                        value={loginPassword} 
                        onChange={e => setLoginPassword(e.target.value)} 
                        className="inputCamp"/>

                        </div>

                        <div className="new-category"> {showPassword ? (<AiFillEyeInvisible onClick={togglePasswordVisibility}
                          className="new-category-icon"/>) : (<AiFillEye onClick={togglePasswordVisibility} className="eyesShow" />)}
                        </div>
                    </div>

                    <button type="button" onClick={handleLogin}
                        className="button-submit"
                        >Entrar
                    </button>
        </form>
      </div>
    </main>
    
);
};

export default Login;