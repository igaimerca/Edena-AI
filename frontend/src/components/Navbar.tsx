"use client"
import { useState } from 'react';
import LogoImage from '../assets/images/logo.png';
import MenuIcon from '../assets/icons/menu.svg';
import Auth from './auth/Auth';
import Modal from './Modal';

export const Navbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openLoginModal = () => {
    setLoginOpen(true);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <div className="bg-black">
        <div className="px-4">
          <div className="container bg-black">
            <div className="py-4 flex items-center justify-between">
              <div className="relative">
                <img 
                  src={LogoImage.src} 
                  className="h-16 relative mt-1" 
                  alt="Logo" 
                />
              </div>
              <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
                <MenuIcon className="text-white" />
              </div>
              <nav className="text-white gap-6 items-center hidden sm:flex">
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
                  Home
                </a>
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
                  Mock Interviews
                </a>
                <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
                  Contact
                </a>
                <button 
                  onClick={openLoginModal} 
                  className="bg-white py-2 px-4 rounded-lg text-black"
                >
                  Get Started
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isLoginOpen} onClose={closeLoginModal}>
        <Auth />
      </Modal>
    </>
  );
};
