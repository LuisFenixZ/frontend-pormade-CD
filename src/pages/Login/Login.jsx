import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import './style-login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logoCantina from "../../img/logo preta folha branca.png";
import { AuthContext } from "../../contexts/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const { signIn, signed } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    await signIn(data);
  };
  console.log(signed);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordRegisterVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  if (!signed) {
    return (
      
      <form className="align-form" onSubmit={handleSubmit}>
        <img className="logoCantina" src={logoCantina} alt="logoCantina"></img>
        <h2 className="login__h2__title">Faça o Login</h2>
      
        <p className="par">Usuário</p>
        <div className="divCamp">    
            <input type="text" name="emailLogin" value={email} onChange={e => setEmail(e.target.value)} className="inputCamp"  />
        </div>
      
        <p className="par">Senha</p>
        
        <div className="divCampPassword">

          <input type={showPassword ? "text" : "password"} name="passwordLogin" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="inputCamp"/>

          <div className=""> {showPassword ? (<div onClick={togglePasswordVisibility}><AiOutlineEyeInvisible
            className="eyesHide"/></div>) : (<div onClick={togglePasswordVisibility}><AiOutlineEye className="eyesShow" /></div>)}
          </div>
        </div>

        <button type="submit"
            className="button-submit"
            >Entrar
        </button>
      </form>
    );
  } else {
    return <Navigate to="/admin" />;
  }
};

export default Login;