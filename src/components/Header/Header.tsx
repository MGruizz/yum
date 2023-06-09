import React, { Fragment, useState, useEffect } from "react";
import { HeaderProps } from "../../interfaces/Header/HeaderProps";
import { Recipe } from "../../interfaces/Recipe/Recipe"
import useSearch from "../../hooks/useSearch";
import { User } from "../../features/user/userInterfaces";

import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineUserAdd,
  AiOutlineLogin
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import CrearReceta from "../CrearReceta/CrearReceta";
import { useAuth } from '../../context/AuthContext';
import { removeToken, getUserToken } from '../../api/authApi';
import { searchRecipe } from '../../api/recipeApi';
import CrearCategoria from "../CrearCategoria/CrearCategoria";



const Header: React.FC<HeaderProps> = () => {
  const userToken = getUserToken();
  const [showModal, setShowModal] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setAuthenticated } = useAuth();
  const { setSearchResults } = useSearch();
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = getUserToken();
        setUser(userToken);


      } catch (error) {
        console.error("Error al cargar la información del usuario");
      }
    };

    fetchUser();
  }, []);


  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };



  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userToken?.id}`);
  };

  const handleRecipeClick = () => {
    setShowModal(true);
  };

  const handleCategoryClick = () => {
    setShowModalCategory(true);
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleLogOutClick = () => {
    removeToken();
    setAuthenticated(false);
    navigate('/login');
  };
  const handleRecipeAndClose = () => {
    handleRecipeClick();
    closeSidebar();
  };

  const handleSearchClick = async () => {
    const results = await searchRecipe(searchTerm);
    setSearchResults(results);
    navigate('/search');
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const results = await searchRecipe(searchTerm);
      setSearchResults(results);
      navigate('/search');
    }
  };

  return (
    <Fragment>
      <header className="bg-white text-black ">
        <div className="container mx-auto justify-between grid grid-cols-6 xl:grid-cols-3 items-center">
          {/* Logo */}
          <div className="hidden lg:block lg:col-span-1">
            <button
              className="text-3xl font-semibold my-4 "
              onClick={handleHomeClick}
            >
              YUM
            </button>
          </div>
          {/* Menu Hamburguesa */}
          {!showSidebar && (
            <div className="col-span-1 lg:hidden">
              <button className="bg-transparent " onClick={toggleSidebar}>
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
            {user && <div className="px-4 hidden lg:block">
              <button className="py-2" onClick={handleRecipeClick}>
                <AiOutlinePlusCircle className="text-2xl 2xl:text-3xl" />
              </button>
            </div>}
            {/* Barra de busqueda */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg border-2 border-slate-400 w-full">
              <input
                type="text"
                placeholder="Buscar"
                className="bg-transparent py-2 pl-1 focus:outline-none flex-grow"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="bg-transparent p-1" onClick={handleSearchClick}>
                <AiOutlineSearch className="text-gray-600" />
              </button>
              <div className=""></div>
            </div>
            {(user && user.is_admin) && <div className="px-4 hidden lg:block">
              <button className="py-2" onClick={handleCategoryClick}>
                <AiOutlinePlusCircle className="text-2xl 2xl:text-3xl" />
              </button>
            </div>}
          </div>

          {/* Elementos del usuario */}
          <div className="hidden sm:block sm:col-span-2 xl:col-span-1">
            <p className="text-xl mb-1">Bienvenido {userToken?.username}!</p>
            <div className="flex  items-center justify-center">
              {userToken !== null ? (
                <>

                  <button
                    className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500"
                    onClick={handleProfileClick}
                  >
                    <AiOutlineUser className="text-2xl" />
                    Perfil
                  </button>

                  <button
                    className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500"
                    onClick={handleLogOutClick}
                  >
                    <AiOutlineLogout className="text-2xl" />
                    Cerrar sesion
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500"
                    onClick={handleLoginClick}
                  >
                    <AiOutlineLogin className="text-2xl" />
                    Iniciar sesion
                  </button>

                  <button
                    className="bg-transparent mr-2 flex gap-2 text-gray-500 hover:text-blue-900 transition duration-500"
                    onClick={handleRegisterClick}
                  >
                    <AiOutlineUserAdd className="text-2xl" />
                    Registrarse
                  </button>
                </>
              )}

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
              {/* Logo */}
              <div className="mt-10">
                <button
                  className="text-3xl font-semibold my-4 "
                  onClick={handleHomeClick}
                >
                  YUM
                </button>
              </div>
              {/* Mensaje bienvenida */}
              <div className="mt-10">
                <p className="text-xl mb-1">Bienvenido {userToken?.username}!</p>
                <div className="flex  items-center justify-center"></div>
              </div>
              {/* Boton Casa */}
              <div className="mt-10">
                <button
                  className="text-xl  ml-5 flex gap-2 text-gray-500 hover:text-blue-900 hover:scale-105 transition duration-500"
                  onClick={handleHomeClick}
                >
                  <AiOutlineHome className="text-3xl" />
                  Inicio
                </button>
              </div>

              {userToken !== null ? (
                <>
                  <div className="mt-10">
                    <button
                      className="text-xl bg-transparent ml-5 flex gap-2 text-gray-500 hover:text-blue-900 hover:scale-105 transition duration-500"
                      onClick={handleProfileClick}
                    >
                      <AiOutlineUser className="text-3xl" />
                      Perfil
                    </button>
                  </div>
                  <div className="mt-10">
                    <button
                      className="text-xl bg-transparent ml-5 flex gap-2 text-gray-500 hover:scale-105 hover:text-blue-900 transition duration-500"
                      onClick={handleRecipeAndClose}
                    >
                      <AiOutlinePlusCircle className="text-3xl" />
                      Nueva receta
                    </button>
                  </div>
                  <div className="mt-10">
                    <button
                      className="text-xl bg-transparent ml-5 flex gap-2 text-gray-500 hover:scale-105 hover:text-blue-900 transition duration-500"
                      onClick={handleLogOutClick}
                    >
                      <AiOutlineLogout className="text-3xl" />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-10">
                    <button
                      className="text-xl bg-transparent ml-5 flex gap-2 text-gray-500 hover:scale-105 hover:text-blue-900 transition duration-500"
                      onClick={handleLoginClick}
                    >
                      <AiOutlineLogin className="text-3xl" />
                      Iniciar Sesion
                    </button>
                  </div>
                  <div className="mt-10">
                    <button
                      className="text-xl bg-transparent ml-5 flex gap-2 text-gray-500 hover:scale-105 hover:text-blue-900 transition duration-500"
                      onClick={handleRegisterClick}
                    >
                      <AiOutlineUserAdd className="text-3xl" />
                      Crear cuenta
                    </button>
                  </div>
                </>
              )}


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
      {showModalCategory && (
        <CrearCategoria
          isVisible={showModalCategory}
          onClose={() => setShowModalCategory(false)}
        />
      )}
    </Fragment>
  );
};

export default Header;
