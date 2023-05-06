import React, { useState } from 'react';
import { CrearRecetaProps, FormRecetasInputs } from '../../interfaces/CrearRecetaProps/CrearRecetaProps';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../utils/validators';
import createRecipe from '../../api/recipeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CrearReceta: React.FC<CrearRecetaProps> = ({ isVisible, onClose }) => {

    // receta = query(idReceta)
    const [ingredientes, setIngredientes] = useState<string[]>([]);
    const [pasos, setPasos] = useState<{ numero: number, descripcion: string }[]>([]);
    const [inputIngrediente, setInputIngrediente] = useState<string>('');
    const [inputPaso, setInputPaso] = useState<string>('');
    const [numeroPasos, setNumeroPasos] = useState<number>(1);

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormRecetasInputs>({
        // @ts-ignore
        resolver: yupResolver(validationSchema),
    });

    const customSize = {
        width: 400,
        height: 720
    }

    const agregarIngrediente = () => {
        if (inputIngrediente.trim() !== "") {
            setIngredientes([...ingredientes, inputIngrediente]);
            setInputIngrediente("");
        }
    };

    const agregarPaso = () => {
        if (inputPaso.trim() !== "") {
            const nuevoPaso = {
                numero: pasos.length + 1,
                descripcion: inputPaso,
            };
            setPasos([...pasos, nuevoPaso]);
            setInputPaso("");
        }
    };

    const eliminarIngrediente = (index: number) => {
        setIngredientes((prevIngredientes) =>
            prevIngredientes.filter((_, i) => i !== index)
        );
    };

    const eliminarPaso = (index: number) => {
        setPasos((prevPasos) => prevPasos.filter((_, i) => i !== index).map((paso, i) => ({ numero: i + 1, descripcion: paso.descripcion })));
        setNumeroPasos(numeroPasos - 1);
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    //     if (event.currentTarget.files) {
    //         setFieldValue("fotoReceta", event.currentTarget.files[0]);
    //     }
    // };

    const onSubmit: SubmitHandler<FormRecetasInputs> = async (values) => {
        const valoresActualizados = {
            ...values,
            ingredientesReceta: ingredientes,
            pasosReceta: pasos,
        };
        await createRecipe(valoresActualizados);
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
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">
                                    <img
                                        className="object-cover overflow-hidden"
                                        style={customSize}
                                        src="https://via.placeholder.com/200x270"
                                        alt=""
                                    />
                                </div>
                                <div className="col-span-7 px-4 py-3">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label htmlFor="nombreReceta" className="block mb-2">Nombre:</label>
                                            <input
                                                {...register('nombreReceta')}
                                                type="text"
                                                name="nombreReceta"
                                                id="nombreReceta"
                                                placeholder="Ingresa el nombre de la receta"
                                                className="block w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                            {errors.nombreReceta && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.nombreReceta.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="descripcionReceta" className="block mb-2">Descripción:</label>
                                            <textarea
                                                {...register('descripcionReceta')}
                                                name="descripcionReceta"
                                                id="descripcionReceta"
                                                placeholder="Ingresa la descripción de la receta"
                                                className="block w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            />
                                            {errors.descripcionReceta && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.descripcionReceta.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="ingredientesReceta" className="block mb-2">Ingredientes:</label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={inputIngrediente}
                                                    onChange={(e) => setInputIngrediente(e.target.value)}
                                                    placeholder="Ingresa un ingrediente"
                                                    className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={agregarIngrediente}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-r"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded max-h-[100px] overflow-y-scroll mt-2">
                                                <ul>
                                                    {ingredientes.map((ingrediente, index) => (
                                                        <li key={index} className="flex justify-between items-center mb-1">
                                                            <div>{ingrediente}</div>
                                                            <button
                                                                type="button"
                                                                onClick={() => eliminarIngrediente(index)}
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {errors.ingredientesReceta && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.ingredientesReceta.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="pasosReceta" className="block mb-2">Pasos:</label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    value={inputPaso}
                                                    onChange={(e) => setInputPaso(e.target.value)}
                                                    placeholder="Ingresa un paso"
                                                    className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={agregarPaso}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-r"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded max-h-[100px] overflow-y-scroll mt-2">
                                                <ol>
                                                    {pasos.map((paso, index) => (
                                                        <li key={index} className="flex justify-between items-center mb-1">
                                                            <div>{paso.numero}. {paso.descripcion}</div>
                                                            <button
                                                                type="button"
                                                                onClick={() => eliminarPaso(index)}
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            {errors.pasosReceta && (
                                                <div className="text-red-500 text-sm">
                                                    {errors.pasosReceta.message}
                                                </div>
                                            )}
                                        </div>
                                        {/* <div>
                    <label htmlFor="fotoReceta">Foto:</label>
                    <input
                      {...register('fotoReceta')}
                      type="file"
                      name="fotoReceta"
                      id="fotoReceta"
                      onChange={(event) => {
                        if (event.target.files) {
                          setValue('fotoReceta', event.target.files[0]);
                        }
                      }}
                      className="block"
                    />
                    {errors.fotoReceta && (
                      <div className="text-red-500 text-sm">
                        {/* {errors.fotoReceta.message}}
                      </div>
                    )}
                  </div> */}

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
                </div>
            )}
        </div>
    );
};


export default CrearReceta;