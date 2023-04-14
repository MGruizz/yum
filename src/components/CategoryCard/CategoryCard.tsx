import React from 'react';
import { CategoryCardProps } from '../../interfaces/CategoryCard/CategoryCard';

const RecipeCard: React.FC<CategoryCardProps> = ({ title, imageUrl, subtitle }) => {
    return (
        <div className="flex-shrink-0 my-4 mx-2">
            <div className="bg-white hover:shadow-lg transition duration-500 ease-in-out cursor-pointer rounded-lg overflow-hidden w-30">
                <img className="w-full object-contain" src={imageUrl} alt={title} />
                <div className="p-6">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <h4 className="text-l">{subtitle}</h4>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;