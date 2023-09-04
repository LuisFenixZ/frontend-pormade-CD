import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './style-login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import logoCantina from "../../img/Cantina Logo White WLP.png";
import api from "../../services/api";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const history = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAuthenticated(true);
      history.replace("/admin");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      console.log(login);
      console.log(password);

      const response = await api.post("/users/validate", {
        login: login,
        password: password,
      });
      console.log(response);

      
      const { accessToken } = response.data;

      if (accessToken) {
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
    return <div>Você está autenticado!</div>;
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
                    <input type="text" name="emailLogin" value={login} onChange={e => setLogin(e.target.value)} className="inputCamp"  />
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