import React from "react";
import { ModalRecetasProps } from "../../interfaces/ModalRecetasProps/ModalRecetasProps";

const ModalRecetas: React.FC<ModalRecetasProps> = ({ isVisible, onClose, tituloReceta }) => {

    // receta = query(idReceta)

    const customSizeLg = {
        width: 400,
        height: 600
    }
    const customSizeMd = {
        width: 200,
        height: 300
    }
    const customSizeSm = {
        width: 250,
        height: 750
    }

    return (
        <div>
            {isVisible &&
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-10/12 h-auto sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 relative">
                        <button className="bg-red-500 text-white text-xl font-normal rounded-full px-2 absolute top-2 right-2" onClick={() => onClose()}>X</button>
                        <div className="bg-white rounded mt-5">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="md:col-star-1 md:col-end-2">
                                    <img className="object-cover overflow-hidden w-full h-full md:h-[20rem] lg:h-[30rem]" src="https://via.placeholder.com/200x270" alt="" />
                                </div>
                                <div className="mt-5 pr-5 pl-5 pb-5 md:col-start-2 md:col-end-4">
                                    <h2 className="text-3xl font-bold text-left mb-3">{tituloReceta}</h2>
                                    <p className="text-lg text-left mb-7">Esta es mi receta. Espero que les guste.</p>
                                    <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2"><strong>Paso 1: </strong>Pelar las papas</p>
                                    <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2"><strong>Paso 2: </strong>Hervir</p>
                                    <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2"><strong>Paso 3: </strong>Comer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ModalRecetas;