import React from 'react';
import { RecipeCardProps } from '../../interfaces/RecipeCard/RecipeCardProps';

const RecipeCard: React.FC<RecipeCardProps> = ({ title, subtitulo, imageUrl }) => {
  return (
    <div className="flex-shrink-0 my-4 mx-2 w-[300px] ">
    <div className="bg-white hover:shadow-lg transition duration-500 ease-in-out cursor-pointer rounded-lg overflow-hidden">
        <img className="h-[350px] w-full object-cover" src={imageUrl} alt={title} />
        <div className="p-6 h-[110px]">
            <h3 className="text-xl font-semibold overflow-hidden overflow-ellipsis">{title}</h3>
            <h4 className="text-l overflow-hidden overflow-ellipsis">{subtitulo}</h4>
        </div>
    </div>
</div>
  );
};

export default RecipeCard;