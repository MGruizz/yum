import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

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
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RecipeCard
              title="Delicious Recipe 1"
              imageUrl="https://via.placeholder.com/350x200"
            />
            <RecipeCard
              title="Delicious Recipe 2"
              imageUrl="https://via.placeholder.com/350x200"
            />
            <RecipeCard
              title="Delicious Recipe 3"
              imageUrl="https://via.placeholder.com/350x200"
            />
            {/* Agrega más tarjetas de recetas según sea necesario */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FrontPage;