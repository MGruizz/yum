import React from 'react';
import { FooterProps } from '../../interfaces/Footer/FooterProps';
    
const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="bg-gray-500 text-white py-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">

                {/* Información */}
                <div className="w-full sm:w-auto mb-4 sm:mb-0"> 
                    <ul>
                        <a href="#" className="hover:text-gray-300">
                            <li>Contacto</li>
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <li>Terminos y condiciones</li>
                        </a>
                        <a href="#" className="hover:text-gray-300">
                            <li>Sobre Nosotros</li>
                        </a>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="w-full sm:w-auto">
                    <p className="">YUM LOGO</p>
                </div>

            </div>
        </footer>
    )
};

export default Footer