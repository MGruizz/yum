import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
function LoginPage() {
  const imagen: string = "https://burst.shopifycdn.com/photos/fresh-vegetables-flatlay.jpg?width=1200&format=pjpg&exif=1&iptc=1";
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center ">
      <Link rel="stylesheet" to="/" >
      <button
          className="absolute top-4 left-4 text-blue-700 hover:text-blue-800 transition-colors duration-200 p-2 bg-white rounded-full shadow-md"
        >
          <IoArrowBack size={24} />
        </button>
      </Link>
      
      <div className="w-full mx-3 lg:mx-0 max-w-6xl bg-white shadow-xl rounded-lg md:flex md:gap-x-8 lg:pr-8 relative">
        
        <div className="hidden md:block w-1/2">
          <img
            src={imagen}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="grid grid-col-1 w-full md:w-1/2 space-y-6 py-10">
          <div className="space-y-6">
            <h1 className="text-6xl font-semibold text-gray-700 mt-5">Yum</h1>
            <h2>Bienvenido!</h2>
            <LoginForm />
          </div>
          <div className="self-end">
            <h3 className="text-xl font-semibold text-gray-700">
              No eres usuario de Yum?
              <Link to="/register">
                <button
                  
                  className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Regístrate aquí
                </button>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;