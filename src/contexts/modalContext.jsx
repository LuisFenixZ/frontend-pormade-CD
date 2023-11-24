import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  const openModal = (routes) => {
    setIsModalOpen(true);
    setAllowedRoutes(routes);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAllowedRoutes([]);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, allowedRoutes }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
