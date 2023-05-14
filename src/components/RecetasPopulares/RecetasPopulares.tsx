import React, { Fragment, useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';
import { getPopularRecipes } from '../../api/recipeApi';

const RecetasPopulares = () => {
    const [recetasPopulares, setRecetasPopulares] = useState<PopularRecipe[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [receta, setReceta] = useState({ id: '', name: '', description: '' });

    useEffect(() => {
        getPopularRecipes()
            .then(data => {
                setRecetasPopulares(data);
                console.log('recetas populares', data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleShowModal = (recipeId: string, recipeName: string, recipeDescription: string) => {
        setShowModal(true)
        setReceta({ 
             id: recipeId,
             name: recipeName,
             description: recipeDescription
        });
    }

    return (
        <Fragment>
            <div>
                <h2 className="text-4xl font-bold mb-2 mt-4">Recetas Populares</h2>
                <hr className="w-full mt-8 mb-4 border-gray-400" />
                <div className='flex flex-wrap gap-4 justify-center px-4'>
                    {recetasPopulares.map((recipe, index) => (
                        <div className="flex-shrink-0" onClick={() => handleShowModal(recipe.id, recipe.nombre, recipe.descripcion)} key={index}>
                            <RecipeCard
                                title={recipe.nombre}
                                subtitulo={recipe.descripcion}
                                imageUrl="https://via.placeholder.com/200x270"
                            />
                        </div>
                    ))}
                    {showModal && <ModalRecetas tituloReceta={receta.name} isVisible={showModal} onClose={() => setShowModal(false)} recipeId={receta.id} />}
                </div>
            </div>
        </Fragment>
    )
}

export default RecetasPopulares;