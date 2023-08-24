import React, { useState } from "react";
import Swal from "sweetalert2";
import './style-login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import logoCantina from "../../img/Cantina Logo White WLP.png";

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
     
      const response = await api.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.status === 200) {
        const {is_admin} = response.data;
        if (is_admin) {
          history('/payment');
          Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success")
        } 
        else {
          history('/mostra-produtos2');
          Swal.fire("Login Realizado com Sucesso", "Seja Bem Vindo!", "success")
        }
        
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Erro ao fazer login", "Verifique suas credenciais e tente novamente", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
  
      const response = await api.post("/users/register", {
        email: registerEmail,
        password: registerPassword,
        is_admin: is_admin,
      });

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
         
    <form className="align-form">
      <img className="logoCantina" src={logoCantina} alt="logoCantina"></img>
        <h2 className="login__h2__title">Faça o Login</h2>
      
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

                    <div> {showPassword ? (<div  className="eyes-visibility" onClick={togglePasswordVisibility}><AiFillEyeInvisible
                      className="eyesHide"/></div>) : (<div  className="eyes-visibility" onClick={togglePasswordVisibility}><AiFillEye className="eyesShow" /></div>)}
                    </div>
                </div>

                <button type="button" onClick={handleLogin}
                    className="button-submit"
                    >Entrar
                </button>

        {/* <h2 className="cad__h2__title">Cadastre-se</h2>
        
                <p className="par">Email</p>
                <div className="input">    
                    <input type="text" name="registerEmail" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} className="inputCamp"  />
                </div>
            
                <p className="par">Senha</p>
                <div className="select__options">
                  
                    <div className="select__options__category">

                  <input type={showRegisterPassword ? "text" : "password"} name="registerPassword" 
                    value={registerPassword} 
                    onChange={e => setRegisterPassword(e.target.value)} 
                    className="inputCamp"/>

                  </div>
                  <div> {showRegisterPassword ? (<div className="eyes-visibility" onClick={togglePasswordRegisterVisibility}><AiFillEyeInvisible
                      className="eyesHide"/></div>) : (<div className="eyes-visibility" onClick={togglePasswordRegisterVisibility}><AiFillEye className="eyesShow" /></div>)}
                </div>
                </div>
                

                <p className="par">Nível de Acesso</p>
                <div className="select__options">
                  
                  <div className="select__options_category">
                    <select value={is_admin} onChange={(e) => setIs_Admin(e.target.value)} className="inputCamp">
                      <option value={false}>Usuário Comum</option>
                      <option value={true}>Usuário Administrador</option>
                    </select>
                  </div>
                  
                </div>
                
                <button type="button" onClick={handleRegister}
                    className="button-submit"
                    >Cadastrar
                </button>    */}

    </form>
);
};

export default Login;