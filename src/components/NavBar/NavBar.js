import React, { useState } from 'react';
import {BsHouses} from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import logoPormade from "../../img/logoPormade.png";

import "./navbar.css";

function NavBar() {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isLoggedIn = true;
  const isAdmin = false;

  const history = useNavigate();

  const mainMenu = () => {
    history('/');
  }
  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleItemClick = () => {
    setShowOffcanvas(false);
  };

  const [userInfoVisibility, setUserInfoVisibility] = useState(false);

    const handleUserInfo = () => {
      setUserInfoVisibility(userInfoVisibility);
    }

    const closeEdit = () => {
      setUserInfoVisibility(false);
    }

  return (
    <nav className=''>

      {/* <BsHouses className='nav-home-return' onClick={mainMenu}/> */}
      <img src={logoPormade} alt='logoPormade' className='nav-home-return' onClick={mainMenu}></img>

    </nav>
  );

}

export default NavBar;
