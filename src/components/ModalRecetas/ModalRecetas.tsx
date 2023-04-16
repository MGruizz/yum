import React from "react";
import { ModalRecetasProps } from "../../interfaces/ModalRecetasProps/ModalRecetasProps";

const ModalRecetas: React.FC<ModalRecetasProps> = ({ isVisible, onClose }) => {

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black 
        bg-opacity-25 backdrop-blur-sm flex
        justify-center items-center">
            <div className="w-[600px]">
                <button className="bg-red-500 text-white 
                text-xl font-normal rounded-full px-2 
                float-right" onClick={() => onClose()}>X</button>
                <div className="bg-white rounded mt-5">Holi</div>
            </div>
        </div>
    )
}

export default ModalRecetas;