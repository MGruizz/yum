import React from "react";
import { FaPen } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';

function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
        <div className="flex justify-end">
          <button className="flex justify-end"> <FaPen /></button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 sm:image-center">
          <div className="col-span-1 flex justify-center md:justify-start md:ml-10 rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-2 space-y-4 pt-3 pl-5">
            <h1 className="text-2xl font-bold text-gray-800 text-left">Juanito Perez blog</h1>
            <p className="text-gray-600 text-left">Soy un cocinero novato que busca mostrar mis recetas al resto del mundo</p>
          </div>
        </div>
        <div className="flex justify-end">
          <FaLink />
        </div>
        <div className="border-b border-gray-300 my-4" />
        <h1 className="text-2xl font-bold text-gray-800">Publicaciones</h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
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
