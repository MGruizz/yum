import React from 'react';
import MensajeInicio from './MensajeInicio';

const MensajesInicio = () => {

    const mensajesInicio = [
        {
            imageUrl: "faPizzaSlice",
            title: "¡Comienza a cocinar hoy!",
            description: "En este espacio, aprende a cocinar sin mayor restriccion."
        },
        {
            imageUrl: "faStar",
            title: "Comparte y disfruta",
            description: "Descubre y comparte las recetas de tu interés con tus cercanos!."
        }
    ]

    return (
        <div className="flex flex-wrap justify-center gap-8 px-4">
            {mensajesInicio.map((mensaje, index) => (
                <div className="w-full sm:w-1/2 lg:w-1/3" key={index}>
                    <MensajeInicio
                        imageUrl={mensaje.imageUrl}
                        title={mensaje.title}
                        description={mensaje.description}
                    />
                </div>
            ))}
         <hr className="w-full mt-8 mb-4 border-gray-400" />
        </div>
    )

}

export default MensajesInicio