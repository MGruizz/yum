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
                <div className="lg:w-[100rem] h-[50rem] md:w-[50rem] h-[30rem] sm:w-[250px] h-[750px]">
                    <button className="bg-red-500 text-white 
                    text-xl font-normal rounded-full px-2 
                    float-right" onClick={() => onClose()}>X</button>
                    <div className="bg-white rounded mt-5">
                        <div className="grid grid-col-12">
                            <div className="col-span-5">
                                <img className="object-cover overflow-hidden lg:w-[10rem] h-[20rem] md:w-[5rem] h-[10rem] sm:w-[7rem] h-[15rem]" src="https://via.placeholder.com/200x270" alt="" />
                            </div>
                            <div className="col-span-7 px-4 py-3">
                                <h2 className="text-3xl font-bold text-left mb-3">{tituloReceta}</h2>
                                <p className="text-lg text-left mb-7">
                                    Esta es mi receta. <br /> Espero que les guste.
                                </p>
                                <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2">
                                    <strong>Paso 1: </strong>Pelar las papas
                                </p>
                                <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2">
                                    <strong>Paso 2: </strong>Hervir
                                </p>
                                <p className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2">
                                    <strong>Paso 3: </strong>Comer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ModalRecetas;