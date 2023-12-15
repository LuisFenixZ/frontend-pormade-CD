import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logoCantina from "../../img/logo preta folha branca.png";
import { AuthContext } from "../../contexts/useAuth";
import  '../../App.css';

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

      <div className="flex justify-center items-center w-full h-full mx-auto my-auto">
        <form className="w-[80%] sm:w-[90%] md:w-[70%] lg:w-[70%] xl:w-[50%] flex flex-col ml-auto mr-auto" onSubmit={handleSubmit}>
          <img className="w-[40%] h-[40%] ml-auto mr-auto mb-[3%]" src={logoCantina} alt="logoCantina"></img>
          <h2 className="mr-auto ml-auto mb-[1%] text-white text-[35px] text-center font-primary">Faça o Login</h2>
        
          <p className="mr-auto mb-[1%] text-white text-[20px] font-primary">Usuário</p>
          <div className="w-[100%] h-[55px] flex flex-row ml-auto mr-auto bg-grey3 border-2 border-green2 rounded-[10px] p-3 mb-[1%]">    
              <input type="text" name="emailLogin" value={email} onChange={e => setEmail(e.target.value)} className="input w-[100%] h-[25px] bg-grey3 border-none outline-none font-primary text-[15px] text-white"  />
          </div>
        
          <p className="mr-auto mb-[1%] text-white text-[20px] font-primary">Senha</p>
          
          <div className="w-[100%] h-[55px] flex flex-row justify-center items-center ml-auto mr-auto bg-grey3 border-2 border-green2 rounded-[10px] p-3 mb-[3%]">

            <input type={showPassword ? "text" : "password"} name="passwordLogin" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="input w-[100%] h-[25px] bg-grey3 border-none outline-none font-primary text-[15px] text-white"/>

            <div className=""> {showPassword ? (<div onClick={togglePasswordVisibility}><AiOutlineEyeInvisible
              className="w-[35px] h-[35px] text-white"/></div>) : (<div onClick={togglePasswordVisibility}><AiOutlineEye className="w-[35px] h-[35px] text-white" /></div>)}
            </div>
          </div>

          <button type="submit"
              className="w-[100%] h-[55px] mt-[3%] flex justify-center items-center text-[20px] text-white font-primary bg-green1 border-2 border-green2 rounded-[10px]"
              >Entrar
          </button>
        </form>
      </div>
    );
  } else {
    return <Navigate to="/admin" />;
  }
};

export default Login;