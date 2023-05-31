import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationCategorySchema } from '../../utils/validators';
import { createRecipe } from '../../api/recipeApi';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CrearCategoriaaProps, FormCategoriasInputs } from '../../interfaces/CrearCategoriaProps/CrearCategoriaProps';
import { createCategory } from '../../api/categoriesApi';

const CrearCategoria: React.FC<CrearCategoriaaProps> = ({ isVisible, onClose }) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormCategoriasInputs>({
        // @ts-ignore
        resolver: yupResolver(validationCategorySchema),
    });

    const customSize = {
        width: 400,
        height: 720
    }

    const onSubmit: SubmitHandler<FormCategoriasInputs> = async (values) => {
        const valoresActualizados = {
            ...values,
        };
        const result = await createCategory(valoresActualizados);
        if (result) {
            toast.success('Categoria creada con éxito!');
            onClose();
        }
    };

    return (
        <div>
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[1000px]">
                        <button
                            className="bg-red-500 text-white text-xl font-normal rounded-full px-2 float-right"
                            onClick={() => onClose()}
                        >
                            X
                        </button>
                        <div className="bg-white rounded mt-5">
                            <div className="grid p-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="nombreCategoria" className="block mb-2">Nombre de la Categoria:</label>
                                        <input
                                            {...register('nombreCategoria')}
                                            type="text"
                                            name="nombreCategoria"
                                            id="nombreCategoria"
                                            placeholder="Ingresa el nombre de la categoria"
                                            className="block w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        {errors.nombreCategoria && (
                                            <div className="text-red-500 text-sm">
                                                {errors.nombreCategoria.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="bottom-right" />
        </div>
    );
};


export default CrearCategoria;