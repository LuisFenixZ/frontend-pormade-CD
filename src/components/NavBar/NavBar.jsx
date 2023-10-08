import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPormade from "../../img/logoPormade.png";
import { BiLogOut } from "react-icons/bi";

import "./navbar.css";

function NavBar(props) {
  const history = useNavigate();

  const mainMenu = () => {
    history('/');
  }
  

  const [userInfoVisibility, setUserInfoVisibility] = useState(false);


  
  const handleLogout = () => {
    // Limpar o token de autenticação (caso esteja armazenado localmente)
    localStorage.removeItem('adminToken');

    history('/login')
  };

   

  return (
    <nav className=''>

      <img src={logoPormade} alt='logoPormade' className='nav-home-return' onClick={mainMenu}></img>
      <BiLogOut className="logout" onClick={handleLogout}>Sair</BiLogOut>
    </nav>
  );

}

export default NavBar;
