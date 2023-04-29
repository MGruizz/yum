import React from "react";
import { CrearRecetaProps } from "../../interfaces/CrearRecetaProps/CrearRecetaProps";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CrearReceta: React.FC<CrearRecetaProps> = ({ isVisible, onClose }) => {

    // receta = query(idReceta)

    const customSize = {
        width: 400,
        height: 600
    }

    const validationSchema = Yup.object({
        nombreReceta: Yup.string().required('Debe ingresar un nombre a la receta'),
        descripcionReceta: Yup.string().required('Debe ingresar una descripción para la receta'),
        ingredientesReceta: Yup.string().required('Debe ingresar los ingredientes de la receta'),
        pasosReceta: Yup.string().required('Debe ingresar los pasos de la receta'),
        fotoReceta: Yup.mixed().required('Debe cargar una foto de la receta'),
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        if (event.currentTarget.files) {
            setFieldValue("fotoReceta", event.currentTarget.files[0]);
        }
    };

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <div>
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-[1000px]">
                        <button className="bg-red-500 text-white text-xl font-normal rounded-full px-2 float-right" onClick={() => onClose()}>
                            X
                        </button>
                        <div className="bg-white rounded mt-5">
                            <div className="grid grid-cols-12">
                                <div className="col-span-5">
                                    <img className="object-cover overflow-hidden" style={customSize} src="https://via.placeholder.com/200x270" alt="" />
                                </div>
                                <div className="col-span-7 px-4 py-3">
                                    <Formik
                                        initialValues={{ nombreReceta: '', descripcionReceta: '', ingredientesReceta: '', pasosReceta: '', fotoReceta: null }}
                                        validationSchema={validationSchema}
                                        validateOnBlur={false}
                                        onSubmit={(values) => handleSubmit(values)}
                                    >
                                        {({ setFieldValue }) => (
                                            <form className="space-y-4">
                                                <div>
                                                    <label htmlFor="nombreReceta">Nombre:</label>
                                                    <Field
                                                        type="text"
                                                        name="nombreReceta"
                                                        id="nombreReceta"
                                                        placeholder="Ingresa el nombre de la receta"
                                                        className="block"
                                                    />
                                                    <ErrorMessage name="nombreReceta" component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div>
                                                    <label htmlFor="descripcionReceta">Descripción:</label>
                                                    <Field
                                                        as="textarea"
                                                        name="descripcionReceta"
                                                        id="descripcionReceta"
                                                        placeholder="Ingresa la descripción de la receta"
                                                        className="block"
                                                    />
                                                    <ErrorMessage name="descripcionReceta" component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div>
                                                    <label htmlFor="ingredientesReceta">Ingredientes:</label>
                                                    <Field
                                                        type="text"
                                                        name="ingredientesReceta"
                                                        id="ingredientesReceta"
                                                        placeholder="Ingresa los ingredientes de la receta"
                                                        className="block"
                                                    />
                                                    <ErrorMessage name="ingredientesReceta" component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div>
                                                    <label htmlFor="pasosReceta">Pasos:</label>
                                                    <Field
                                                        type="text"
                                                        name="pasosReceta"
                                                        id="pasosReceta"
                                                        placeholder="Ingresa los pasos de la receta"
                                                        className="block"
                                                    />
                                                    <ErrorMessage name="pasosReceta" component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div>
                                                    <label htmlFor="fotoReceta">Foto:</label>
                                                    <input
                                                        type="file"
                                                        name="fotoReceta"
                                                        id="fotoReceta"
                                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                                        className="block"
                                                    />
                                                    <ErrorMessage name="fotoReceta" component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div>
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        Enviar
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
{/*<label htmlFor="">Descripción:</label>
                                <textarea name="" id="" placeholder="Ingresa la descripción de la receta"></textarea>
                                <label htmlFor="">Ingredientes:</label>
                                <input type="text" name="" id="" placeholder="Ingresa el ingrediente n" />
                                <label htmlFor="">Pasos:</label>
                                <input type="text" name="" id="" placeholder="Ingresa el paso n" />
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
                                </p>*/}

export default CrearReceta;