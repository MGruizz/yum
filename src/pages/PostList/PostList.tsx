import React, { Fragment, useState, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';
import Header from '../../components/Header/Header';

const PostList = () => {
    const [showModal, setShowModal] = useState(false);
    const [receta, setReceta] = useState({ id: '', name: '', description: '' });
    const [itemsToShow, setItemsToShow] = useState(5);
    const [isMax, setIsMax] = useState(false);

    const { searchResults } = useSearch();

    const handleShowModal = (recipeId: string, recipeName: string, recipeDescription: string) => {
        setShowModal(true);
        setReceta({ 
             id: recipeId,
             name: recipeName,
             description: recipeDescription
        });
    }

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (itemsToShow >= searchResults.length) {
            setIsMax(true);
            return;
        }
        setItemsToShow(itemsToShow + 10); // cargar 10 items más cuando se llega al final de la página
    }

    useEffect(() => {
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [itemsToShow, isMax]);

    console.log(searchResults);
    
    return (
        
        <Fragment>
            <Header></Header>
            <div className="max-w-screen-2xl mx-auto">
                {searchResults.slice(0, itemsToShow).map((receta) => (
                    <div key={receta.id}>
                        <div
                            className="flex items-stretch my-8 mx-auto w-3/4 bg-white shadow-md rounded-md p-0 cursor-pointer overflow-hidden"
                            onClick={() => handleShowModal(String(receta.id), receta.nombre, receta.descripcion)}
                        >
                            <div className="w-2/5">
                                <img
                                    src={'https://via.placeholder.com/150'}
                                    alt={`Imagen de ${receta.nombre}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col ml-6 w-3/5 p-4 justify-center mt-40">
                                <h2 className="text-2xl font-bold">{receta.nombre}</h2>
                                <p className="mt-2 text-gray-600 flex-grow">
                                    {receta.descripcion}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {showModal && 
                    <ModalRecetas 
                        tituloReceta={receta.name} 
                        isVisible={showModal} 
                        onClose={() => setShowModal(false)} 
                        recipeId={receta.id} 
                    />
                }
            </div>
            {!isMax && <div className="text-center">Loading...</div>}
        </Fragment>
    );
};

export default PostList;