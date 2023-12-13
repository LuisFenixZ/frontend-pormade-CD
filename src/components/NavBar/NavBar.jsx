import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/useAuth';
import { TbMenu2 } from "react-icons/tb";
import logoPormade from '../../img/logoPormade.png';
import "./styles.css";


function NavBar(props) {
  
  const { singOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const [userInfoVisibility, setUserInfoVisibility] = useState(false);
  
  const handleLogout = () => {
    singOut();
    navigate('/login');
    setIsModalOpen(false);
  };

  return (
    <nav className=''>

      <div className='div_logout'>
    
      </div>

      <div className='div_center_nav'>
      <img src={logoPormade} alt='logoPormade' className='nav-home-return'></img>
      </div>

      <div className='div_cart_menu'>
        <TbMenu2 className='menu_nav' onClick={handleOpenModal}></TbMenu2>
      </div>

      {isModalOpen && ( 
      <div className="modal">
        <div className="modal-content">
          <div className='modal_titulo'>
          <p>Conteúdo do Menu</p>
            <TbMenu2 className='menu_nav_close' onClick={handleCloseModal}>&times;</TbMenu2>
          </div>

          <div>
            <button onClick={handleLogout}>Logout</button>  
          </div> 
        </div>
      </div>
    )}
    
    </nav>
  );

}

export default NavBar;