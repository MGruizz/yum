import React from 'react';
import { HeaderProps } from '../../interfaces/Header/HeaderProps';
import { AiOutlineUser, AiOutlineBell, AiOutlineLogout, AiOutlineSearch, AiOutlineHome } from "react-icons/ai";

const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="grid gap-x-8 gap-y-4 grid-cols-3">

            {/* LOGO */}
            <div className="py-3">
                <p className="">YUM</p>
            </div>

            {/* HOME Y BUSCADOR */}
            <div className="py-3">
                <div className="mr-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            
                            <AiOutlineHome className="text-black text-2xl mx-4" />
                            <div className="flex items-center bg-gray-100 rounded-lg border-2 border-slate-400">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="bg-transparent py-2 px-3 focus:outline-none"
                                />
                                <button className="bg-transparent p-1">
                                    <AiOutlineSearch className="text-gray-600" />
                                </button>
                            </div>
                            <button className="bg-transparent p-1 p px-2">
                                <AiOutlineUser className="text-black text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* OPCIONES PERFIL Y SESIÓN */}
            <div className="py-3">
                <div className="mr-4">
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm mb-1">Bienvenido Misebaca!</p>
                        <div className="flex items-center justify-center">
                            <button className="bg-transparent p-1 mr-2">
                                <AiOutlineBell className="text-black text-xl" />
                            </button>
                            <button className="bg-transparent p-1">
                                <AiOutlineLogout className="text-black text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;