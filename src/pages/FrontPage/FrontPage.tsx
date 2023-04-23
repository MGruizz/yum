import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import CategoriasPopulares from '../../components/CategoriasPopulares/CategoriasPopulares';
import RecetasPopulares from '../../components/RecetasPopulares/RecetasPopulares';
import MensajesInicio from '../../components/MensajeInicio/MensajesInicio';
import BannerSeccion from '../../components/BannerSeccion/BannerSeccion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
      <Header/>
      <main className="flex-grow bg-gray-100">
        <img src="https://via.placeholder.com/720x350" alt="" className="w-full h-96 object-cover" />
        <MensajesInicio></MensajesInicio>
        <CategoriasPopulares></CategoriasPopulares>
        <BannerSeccion></BannerSeccion>
        <RecetasPopulares></RecetasPopulares>
      </main>
      <Footer/>
    </div>
  );
};

export default FrontPage;