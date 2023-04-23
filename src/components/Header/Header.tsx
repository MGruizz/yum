import React from 'react';
import { HeaderProps } from '../../interfaces/Header/HeaderProps';
import { AiOutlineUser, AiOutlineBell, AiOutlineLogout, AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Header: React.FC<HeaderProps> = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (

        <header className="bg-white text-black px-8">

            <div className="grid grid-cols-1 md:grid-cols-3 items-center">

                {/* Logo */}
                <h1 className="text-3xl font-semibold my-4">YUM</h1>

                {/* Buscador */}
                <div className="my-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">

                            <AiOutlineHome className="text-2xl mx-4" />
                            <div className="flex items-center bg-gray-100 rounded-lg border-2 border-slate-400">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="bg-transparent py-2 px-3 focus:outline-none"
                                />
                                <button 
                                className="bg-transparent p-1"
                                >
                                    <AiOutlineSearch className="text-gray-600" />
                                </button>
                            </div>
                            <button 
                            className="bg-transparent p-1 p px-2"
                            onClick={handleProfileClick}>
                                <AiOutlineUser className="text-black text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Elementos del usuario */}
                <div className="my-4">
                    <div className="flex flex-col items-center">

                        <p className="text-md mb-1">Bienvenido Misebaca!</p>

                        <div className="flex items-center justify-center">
                            <button className="bg-transparent mr-2">
                                <AiOutlineBell className="text-xl" />
                            </button>
                            <button className="bg-transparent">
                                <AiOutlineLogout className="text-xl" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;