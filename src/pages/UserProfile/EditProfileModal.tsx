import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ModalEditProfileProps } from '../../interfaces/UserProfile/ModalEditProfileProps';

const EditProfileModal: React.FC<ModalEditProfileProps> = ({ isVisible, user, onClose, onSave }) => {
    const [username, setUsername] = useState(user?.username || '');
    const [descripcion, setDescripcion] = useState(user?.descripcion || '');

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setDescripcion(user.descripcion || '');
        }
    }, [user]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(username, descripcion);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-semibold text-lg">Nombre de usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-2 rounded px-2 py-1 text-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="descripcion" className="font-semibold text-lg">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="border-2 rounded px-2 py-1 text-lg"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded transition-colors duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;