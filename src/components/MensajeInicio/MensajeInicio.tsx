import React from 'react';
import { MensajeInicioProps } from '../../interfaces/MensajeInicio/MensajeInicio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPizzaSlice, faStar } from '@fortawesome/free-solid-svg-icons'

const MensajeInicio: React.FC<MensajeInicioProps> = ({ imageUrl, title, description }) => {

    let icon: IconProp;

    switch (imageUrl) {
        case "faPizzaSlice":
            icon = faPizzaSlice;
            break;
        case "faStar":
            icon = faStar;
            break;
        default:
            icon = faPizzaSlice;
            break;
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden text-center my-5">
            <FontAwesomeIcon icon={icon} size='2x' className='mt-5'/>
            <h1 className="text-lg font-bold mt-4">{title}</h1>
            <div className="p-4">{description}</div>
        </div>
    )
}

export default MensajeInicio