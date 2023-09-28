import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './style-login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import logoCantina from "../../img/Cantina Logo White WLP.png";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const history = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const adminToken = localStorage.getItem("adminToken");
  //   if (adminToken) {
  //     setAuthenticated(true);
  //     history.replace("/canteen");
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
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
        history("/admin");
        console.log("Após navegar para /admin");
      
        Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success");
      } else {
        Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
      }
        
      
    } catch (error) {
      console.error("Erro ao executar a função handleLogin:", error);
      Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
    }
  };

  if (authenticated) {
    return <div>Você está autenticado!</div>
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordRegisterVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  return (
         
    <form className="align-form">
      <img className="logoCantina" src={logoCantina} alt="logoCantina"></img>
        <h2 className="login__h2__title">Faça o Login</h2>
      
                <p className="par">Usuário</p>
                <div className="input">    
                    <input type="text" name="emailLogin" value={email} onChange={e => setEmail(e.target.value)} className="inputCamp"  />
                </div>
              
                <p className="par">Senha</p>
                <div className="select__options">
                  
                    <div className="select__options__category">

                    <input type={showPassword ? "text" : "password"} name="passwordLogin" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="inputCamp"/>

                    </div>

                    <div> {showPassword ? (<div  className="eyes-visibility" onClick={togglePasswordVisibility}><AiFillEyeInvisible
                      className="eyesHide"/></div>) : (<div  className="eyes-visibility" onClick={togglePasswordVisibility}><AiFillEye className="eyesShow" /></div>)}
                    </div>
                </div>

                <button type="button" onClick={handleLogin}
                    className="button-submit"
                    >Entrar
                </button>
    </form>
);
};

export default Login;