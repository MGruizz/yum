import React from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const recetasPopulares = [
    {
        titulo: 'Receta 1',
        subtitulo: 'Subtitulo 1'
    },
    {
        titulo: 'Receta 2',
        subtitulo: 'Subtitulo 2'
    },
    {
        titulo: 'Receta 3',
        subtitulo: 'Subtitulo 3'
    },
    {
        titulo: 'Receta 4',
        subtitulo: 'Subtitulo 4'
    }
]

const RecetasPopulares = () => {

    return (
        <div>
            <h2 className="text-4xl font-bold mb-2 mt-4">Recetas Populares</h2>
            <hr className="w-full mt-8 mb-4 border-gray-400"/>
            <div className='flex flex-wrap gap-4 justify-center px-4'>
                { recetasPopulares.map((receta) => (
                    <div className="flex-shrink-0">
                        <RecipeCard
                            title={ receta.titulo }
                            subtitulo={receta.subtitulo}
                            imageUrl="https://via.placeholder.com/200x270"
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default RecetasPopulares;