import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import CategoriasPopulares from '../../components/CategoriasPopulares/CategoriasPopulares';
import RecetasPopulares from '../../components/RecetasPopulares/RecetasPopulares';
import MensajesInicio from '../../components/MensajeInicio/MensajesInicio';
import BannerSeccion from '../../components/BannerSeccion/BannerSeccion';

const FrontPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white py-4 px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">YUM</h1>
          <nav className="space-x-4">
            <button
              className="text-white hover:text-indigo-300"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="text-white hover:text-indigo-300"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">
        <img src="https://via.placeholder.com/720x350" alt="" className="w-full h-96 object-cover" />
        <MensajesInicio></MensajesInicio>
        <CategoriasPopulares></CategoriasPopulares>
        <BannerSeccion></BannerSeccion>
        <RecetasPopulares></RecetasPopulares>
      </main>
    </div>
  );
};

export default FrontPage;