import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPormade from "../../img/logoPormade.png";

import "./navbar.css";

function NavBar(props) {
  const history = useNavigate();

  const mainMenu = () => {
    history('/');
  }
  

  const [userInfoVisibility, setUserInfoVisibility] = useState(false);

  return (
    <nav className=''>

      <img src={logoPormade} alt='logoPormade' className='nav-home-return' onClick={mainMenu}></img>

    </nav>
  );

}

export default NavBar;
