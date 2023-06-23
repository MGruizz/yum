import React, { Fragment, useState, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';
import Header from '../../components/Header/Header';
import { Recipe } from "../../interfaces/Recipe/Recipe";
import { throttle } from "lodash";

const PostList = () => {
    const [showModal, setShowModal] = useState(false);
    const [receta, setReceta] = useState({ id: '', name: '', description: '', imagenes: [''] });
    const [itemsToShow, setItemsToShow] = useState(10);
    const [isMax, setIsMax] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('likes');
    const [isAscending, setIsAscending] = useState(false);

    const { searchResults } = useSearch();

    const handleShowModal = (recipeId: string, recipeName: string, recipeDescription: string, recipeImagenes: string[]) => {
        setShowModal(true);
        setReceta({
            id: recipeId,
            name: recipeName,
            description: recipeDescription,
            imagenes: recipeImagenes
        });
    }

    const sortItems = (items: Recipe[]): Recipe[] => {
        if (!items) {
            return [];
        } else {
            return [...items].sort((a: Recipe, b: Recipe) => {
                if (sortCriteria === 'likes') {
                    const likesA = Number(a.likes) || 0;
                    const likesB = Number(b.likes) || 0;
                    if (isAscending) {
                        return likesA - likesB;
                    }
                    return likesB - likesA;
                } else if (sortCriteria === 'created_at') {
                    const dateA = a.created_at ? new Date(a.created_at) : new Date();
                    const dateB = b.created_at ? new Date(b.created_at) : new Date();
                    if (isAscending) {
                        return dateA.getTime() - dateB.getTime();
                    }
                    return dateB.getTime() - dateA.getTime();
                }
                return 0;
            });
        }
    }

    const loadMore = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

        if (scrollTop + window.innerHeight >= scrollHeight) {
            setItemsToShow(prevItemsToShow => {
                if (prevItemsToShow >= searchResults.length) {
                    setIsMax(true);
                    return prevItemsToShow;
                }
                return prevItemsToShow + 10;
            });
        }
    }

    useEffect(() => {
        const loadMoreThrottled = throttle(loadMore, 200);
        window.addEventListener('scroll', loadMoreThrottled);
        return () => window.removeEventListener('scroll', loadMoreThrottled);
    }, [searchResults]);

    useEffect(() => {
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [itemsToShow, isMax, sortCriteria, isAscending]);
    return (

        <Fragment>
            <Header></Header>
            <div className="filter-buttons" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <label style={{ padding: '5px 10px 5px 0' }}>Ordenar según: </label>
                <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortCriteria(e.target.value)}
                    style={{ marginRight: '10px' }}
                >
                    <option value="likes">Likes</option>
                    <option value="created_at">Fecha</option>
                </select>
                <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsAscending(prev => !prev)}
                    style={{ background: 'lightblue', borderRadius: '5px', border: 'none', padding: '5px 10px', marginRight: '100px', cursor: 'pointer' }}
                >
                    {isAscending ? 'Ascendente' : 'Descendente'}
                </button>
            </div>
            <div className="max-w-screen-2xl mx-auto">
                {sortItems(searchResults).map((receta) => (
                    <div key={receta.id}>
                        <div
                            className="flex items-stretch my-8 mx-auto w-3/4 bg-white shadow-md rounded-md p-0 cursor-pointer overflow-hidden"
                            onClick={() => handleShowModal(String(receta.id), receta.nombre, receta.descripcion, receta.imagenes)}
                        >
                            <div className="w-2/5">
                                <img
                                    src={receta.imagenes && receta.imagenes.length > 0 ? receta.imagenes[0] : 'https://via.placeholder.com/150'}
                                    alt={`Imagen de ${receta.nombre}`}
                                    className="w-full h-full object-cover"
                                    style={{ width: '400px', height: '400px', objectFit: 'cover' }}
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
            {!searchResults && <div className="text-center text-4xl">No se encontraron coincidencias</div>}
        </Fragment>
    );
};

export default PostList;