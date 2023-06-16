import React from 'react';
import { CategoryCardProps } from '../../interfaces/CategoryCard/CategoryCard';

const RecipeCard: React.FC<CategoryCardProps> = ({ title, imageUrl }) => {
    return (
        <div className="flex-shrink-0 my-4 mx-3 w-[300px]">
            <div className="bg-white hover:shadow-lg transition duration-500 ease-in-out cursor-pointer rounded-lg overflow-hidden w-30">
                <img className="h-[350px] w-full object-cover" src={imageUrl} alt={title} />
                <div className="p-6">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;