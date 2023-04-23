import React, { Fragment, useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';

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

    const [showModal, setShowModal] = useState(false);
    const [receta, setReceta] = useState({titulo: ''});

    const handleShowModal = (tituloReceta: string) => {
        setShowModal(true)
        setReceta({titulo: tituloReceta});
    }


    return (
        <Fragment>
            <div>
                <h2 className="text-4xl font-bold mb-2 mt-4">Recetas Populares</h2>
                <hr className="w-full mt-8 mb-4 border-gray-400"/>
                <div className='flex flex-wrap gap-4 justify-center px-4'>
                    { recetasPopulares.map((receta,index) => (
                        <div className="flex-shrink-0" onClick={() => handleShowModal(receta.titulo) } key={index}>
                            <RecipeCard
                                title={ receta.titulo }
                                subtitulo={receta.subtitulo}
                                imageUrl="https://via.placeholder.com/200x270"
                            />
                        </div>
                    ))}
                     {showModal && <ModalRecetas tituloReceta={receta.titulo} isVisible={showModal} onClose={() => setShowModal(false)} />}
                </div>
            </div>
        </Fragment>
    )

}

export default RecetasPopulares;