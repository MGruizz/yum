import React from "react";

const PostList = () => {
    const recetas = [
        {
            id: 1,
            nombre: "Receta 1",
            descripcion: "Breve descripción de la Receta 1",
            imagen: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            nombre: "Receta 2",
            descripcion: "Breve descripción de la Receta 2",
            imagen: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            nombre: "Receta 3",
            descripcion: "Breve descripción de la Receta 3",
            imagen: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            nombre: "Receta 4",
            descripcion: "Breve descripción de la Receta 4",
            imagen: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            nombre: "Receta 5",
            descripcion: "Breve descripción de la Receta 5",
            imagen: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="max-w-screen-2xl mx-auto">
            {recetas.map((receta) => (
                <div key={receta.id}>
                    <div
                        className="flex items-stretch my-8 mx-auto w-3/4 bg-white shadow-md rounded-md p-0 cursor-pointer overflow-hidden"
                    >
                        <div className="w-2/5">
                            <img
                                src={receta.imagen}
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