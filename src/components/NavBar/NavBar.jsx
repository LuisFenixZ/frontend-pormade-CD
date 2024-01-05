import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/useAuth';
import { TbMenu2 } from "react-icons/tb";
import logoPormade from '../../img/logoPormade.png';

function NavBar(props) {
  
  const { singOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  }
  
  const handleLogout = () => {
    singOut();
    navigate('/login');
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '100%', 
      width: '50%',
      height: '100vh',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0A0A0A',
      border: 'none',
      borderLeft: '2px solid #509D46',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      overflowY: 'hidden'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };
  

  return (
    <nav className='flex justify-around items-center h-[65px] p-[0 1%] bg-grey1 text-white sticky top-0 z-10'>

      <div className='w-[100%]'>
    
      </div>

      <div className='w-[100%] flex flex-row justify-center items-center'>
      <img src={logoPormade} alt='logoPormade' className='mr-auto ml-auto w-[35px] h-[35px] text-green2'></img>
      </div>

      <div className='w-[100%] m-5'>
        <TbMenu2 className='w-[35px] h-[35px] text-white cursor-pointer float-right' onClick={handleOpenModal}></TbMenu2>
      </div>

      <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Carrinho de Compras"
      style={customStyles}
      >
        
          <div className='w-[100%] h-[65px] flex flex-row justify-center items-center'>
            <div className='flex flex-row justify-center items-center'>
              <TbMenu2 className='w-[35px] h-[35px] text-white cursor-pointer' onClick={handleOpenModal}></TbMenu2>
            </div>
            
          </div>

          <div className=''>
          <p>Conteúdo do Menu</p>
          </div>

          <div>
            <button onClick={handleLogout}>Logout</button>  
          </div> 
          
      </Modal>
    
    </nav>
  );

}

export default NavBar;