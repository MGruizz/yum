import React from "react";
import { FaPen } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';

function UserProfile() {
  return (
    // Aqui va el Componente del navbar
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-screen-md bg-white shadow-lg ">
        {/* Si es el usuario es el mismo el del perfil que muestre este apartado */}
        <div className="flex justify-end">
          <button className="flex justify-end"> <FaPen /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="col-span-1 flex justify-center md:justify-start md:ml-10">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover md:w-54 md:h-54"
            />
          </div>
          <div className="col-span-1 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Juanito Perez blog</h1>
            <p className="text-gray-600 text-left">Soy un cocinero novato que busca mostrar mis recetas al resto del mundo</p>
          </div>
          
        </div>
        <div className="flex justify-end"> 
           <FaLink />
        </div>
        {/* Barra separadora */}
        <div className="border-b border-gray-300 my-4"/>
        {/* Aqui van los post's */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <img
                src={`https://via.placeholder.com/350`}
                alt={`Post ${index + 1}`}
                className="w-full object-cover transform hover:scale-110 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
