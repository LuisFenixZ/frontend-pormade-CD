import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbMenu2 } from "react-icons/tb";
import logoPormade from '../../img/logoPormade.png';
import "./styles.css";


function NavBar(props) {
  const history = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Adicione o estado para controlar o modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const [userInfoVisibility, setUserInfoVisibility] = useState(false);
  
  // const handleLogout = () => {
  //   // Limpar o token de autenticação (caso esteja armazenado localmente)
  //   localStorage.removeItem('adminToken');

  //   history('/login')
  // };

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

      {isModalOpen && ( // Renderize o modal apenas quando o estado for verdadeiro
      <div className="modal">
        <div className="modal-content">
          <div className='modal_titulo'>
          <p>Conteúdo do Menu</p> {/* Adicione o conteúdo do seu menu aqui */}
            <TbMenu2 className='menu_nav_close' onClick={handleCloseModal}>&times;</TbMenu2>
          </div> 
        </div>
      </div>
    )}
    
    </nav>
  );

}

export default NavBar;