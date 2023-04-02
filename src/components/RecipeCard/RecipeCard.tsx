import React from 'react';
import { RecipeCardProps } from '../../interfaces/RecipeCard/RecipeCardProps';

const RecipeCard: React.FC<RecipeCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;