import React from "react";
import useSearch from "../../hooks/useSearch";

const PostList = () => {

    const { searchResults } = useSearch();
    console.log('resultados busqueda',searchResults);


    return (
        <div className="max-w-screen-2xl mx-auto">
            {searchResults.map((receta) => (
                <div key={receta.id}>
                    <div
                        className="flex items-stretch my-8 mx-auto w-3/4 bg-white shadow-md rounded-md p-0 cursor-pointer overflow-hidden"
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
        </div>
    );
};

export default PostList;