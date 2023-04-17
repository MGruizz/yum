import React from 'react';



function LoginForm() {
  return (
    
    <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
          <input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
          <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
            type="submit"
            className="w-full px-4 py-2  font-semibold text-white bg-green-700 rounded-md hover:bg-green-900 transition-colors duration-100"
        >
            Iniciar sesión
        </button>
    </form>











    // <div >
    //   <h1 className='text-xl'>YUM </h1>
    //   <h2 className='text-sm'> Bienvenido!</h2>
    //     <form className="space-y-4 md:space-y-6 " action="#">
    //         <div className='mx-4 '>
    //             <label htmlFor="email" className=" block text-sm font-medium text-gray-700 ">Email address</label>
    //             <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 w-40 sm:w-auto text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   " placeholder="user@mail.com" />
    //         </div>
    //         <div className='mx-4'>
    //             <label htmlFor="password" className="block text-sm font-medium text-gray-700 ">Password</label>
    //             <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border w-40 sm:w-auto border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   "/>
    //         </div>
    //         <div>
    //             <button className='bg-green-700 text-gray-50 rounded-sm px-3 py-1'> Inicia sesion </button>
    //         </div>
    //     </form>
    // </div>
  );
}

export default LoginForm;