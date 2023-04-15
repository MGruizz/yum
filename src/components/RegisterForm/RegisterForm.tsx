import React from 'react';
import { RegisterFormProps } from '../../interfaces/RegisterForm/RegisterForm';

const RegisterForm: React.FC<RegisterFormProps> = () => {
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
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Repetir Contraseña</label>
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
                Registrate
            </button>
        </form>
    )
};

export default RegisterForm