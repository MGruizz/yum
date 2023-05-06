import React, { Fragment, useState } from "react";
import { HeaderProps } from "../../interfaces/Header/HeaderProps";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlinePlusCircle
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import CrearReceta from "../CrearReceta/CrearReceta";

const Header: React.FC<HeaderProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleProfileClick = () => {
    navigate("/profile/1");
  };

  const handleRecipeClick = () => {
    setShowModal(true);
  };
  const handleHomeClick = () => {
    navigate("/");
  };
  const hanldeLogOutClick = () => {
    navigate('/login');
    //removeToken();
    };

  return (
    <Fragment>
      <header className="bg-white text-black ">
        <div className="container mx-auto justify-between grid grid-cols-6 xl:grid-cols-3 items-center">
          {/* Logo */}
          <div className="hidden lg:block lg:col-span-1">
            <button className="text-3xl font-semibold my-4 " onClick={handleHomeClick}>YUM</button>
          </div>
          {/* Menu Hamburguesa */}
          {!showSidebar && (
            <div className="col-span-1 lg:hidden">
            <button
              className="bg-transparent "
              onClick={toggleSidebar}
            >
              <AiOutlineMenu className="text-2xl mx-4" />
            </button>
          </div>
          )}
          

          {/* Buscador - Grid De almedio */}
          
          <div className="my-4 flex col-span-4 sm:col-span-3 xl:col-span-1 ">
            <div className="px-4 hidden lg:block">
                <button className="py-2" onClick={handleHomeClick}>
                    <AiOutlineHome className="text-2xl 2xl:text-3xl" />
                </button>
            </div>
            <div className="px-4 hidden lg:block">
                <button className="py-2" onClick={handleRecipeClick} >
                    <AiOutlinePlusCircle className="text-2xl 2xl:text-3xl" />
                </button>
            </div>
            
            <div className=" items-center bg-gray-100 rounded-lg border-2 border-slate-400 w-full">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent py-2  focus:outline-none "
              />
              <button className="bg-transparent p-1">
                <AiOutlineSearch className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Elementos del usuario */}
          <div className="hidden sm:block sm:col-span-2 xl:col-span-1">
          <p className="text-xl mb-1">Bienvenido Misebaca!</p>
          <div className="flex  items-center justify-center">
              <button className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500" onClick={handleProfileClick}>
                <AiOutlineUser className="text-2xl" />
                Perfil
              </button>
              
              <button className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500" onClick={hanldeLogOutClick}>
                <AiOutlineLogout className="text-2xl" />
                Cerrar sesion
              </button>
              
            </div>
            
          </div>
        </div>
        {showSidebar && (
          <div className="fixed top-0 left-0 w-full h-full z-50">
          <div
            className="w-full h-full bg-black opacity-50"
            onClick={closeSidebar}
          ></div>
          <div className="w-64 h-full bg-white absolute top-0 left-0 z-50 overflow-y-auto">
            {/* Aquí van los elementos del menú lateral */}
            <div className="mt-10">
                <button className="text-3xl font-semibold my-4 " onClick={handleHomeClick}>YUM</button>
             </div>
            <div className="mt-10">
                <p className="text-xl mb-1">Bienvenido Misebaca!</p>
                <div className="flex  items-center justify-center">
                    <button className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500" onClick={handleProfileClick}>
                        <AiOutlineUser className="text-2xl" />
                        Perfil
                    </button>
                    
                    <button className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500" onClick={hanldeLogOutClick}>
                        <AiOutlineLogout className="text-2xl" />
                        Cerrar sesion
                    </button>
              
                </div>
            </div>
            <div className="mt-10">
                <button className="py-2" onClick={handleHomeClick} >
                    <AiOutlineHome className="text-2xl 2xl:text-3xl" />
                </button>
            </div>
            <div className="mt-10">
                
            </div>
            {/* ... */}
          </div>
        </div>
        )}
      </header>
      {showModal && (
        <CrearReceta
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </Fragment>
  );
};

export default Header;
