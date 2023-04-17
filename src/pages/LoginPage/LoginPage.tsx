import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';


function LoginPage() {
  const imagen: string = "https://burst.shopifycdn.com/photos/fresh-vegetables-flatlay.jpg?width=1200&format=pjpg&exif=1&iptc=1";
  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center ">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg   md:flex md:gap-x-8 lg:pr-8">
        <div className="hidden md:block w-1/2">
          <img
            src={imagen}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6 py-10">
          <div className="space-y-6">
            <h1 className="text-6xl font-semibold text-gray-700 mt-5">Yum</h1>
            <h2>Bienvenido!</h2>
            <LoginForm />
          </div>
          <div className="mt-auto">
            <h3 className="text-xl font-semibold text-gray-700">
              No eres usuario de Yum?
              <button
                onClick={() => {/* aqui va el router pa despues*/}}
                className=" ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Regístrate aquí
              </button>
            </h3>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;