import React, { useState, useEffect } from "react";
import {
  FormRecetasInputs,
  EditarRecetaProps,
} from "../../interfaces/EditarReceta/EditarReceta";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validators";
import { editRecipe, getCategories } from "../../api/recipeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Categorias from "../Categories/Categorias";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/global.css";
import { toast } from "react-toastify";
import { Tag } from "../../features/recipe/recipeInterfaces";
import { Categories } from "../../interfaces/Categories/Categories";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { mapDbObjectToTag } from "../../utils/mapper";

const EditarReceta: React.FC<EditarRecetaProps> = ({
    isVisible,
    onClose,
    receta,
    ingredientes,
    pasos,
    tags
}) => {


  const { setValue } = useForm<FormRecetasInputs>();

  const [inputIngrediente, setInputIngrediente] = useState<string>("");
  const [inputPaso, setInputPaso] = useState<string>("");
  const [numeroPasos, setNumeroPasos] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [Allcategories, setAllCategories] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRecetasInputs>({
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });
const [ingredientesEditados, setIngredientesEditados] = useState < string[] > (ingredientes ? ingredientes.map((ingrediente) => ingrediente.nombre) : []);

const [pasosEditados, setPasosEditados] = useState < {
    numero: number;
    descripcion: string
}[] > (pasos ? pasos.map((paso) => ({numero: paso.orden, descripcion: paso.descripcion})) : []);

  const [selectedCategories, setSelectedCategories] = useState<Tag[]>(
    tags ? tags : []
  );

  useEffect(() => {
    const fetchData = async () => {
      const categoriasData = await getCategories();
      const categoriasDataMapped = categoriasData.map(mapDbObjectToTag);
      setAllCategories(categoriasDataMapped);
    };

    if (receta && ingredientes && pasos && tags) {
      setValue("nombreReceta", receta.nombre);
      setValue("descripcionReceta", receta.descripcion);
      // setIngredientesEditados(
      //   ingredientes.map((ingrediente) => ingrediente.nombre)
      // );
      // setPasosEditados(
      //   pasos.map((paso) => ({
      //     numero: paso.orden,
      //     descripcion: paso.descripcion,
      //   }))
      // );
    }
    fetchData();
  }, [receta, ingredientes, pasos, tags, setValue, Allcategories]);

  const agregarIngrediente = () => {
    if (inputIngrediente.trim() !== "") {
      setIngredientesEditados([...ingredientesEditados, inputIngrediente]);
      setInputIngrediente("");
    }
  };

  const agregarPaso = () => {
    if (inputPaso.trim() !== "") {
      const nuevoPaso = {
        numero: pasosEditados.length + 1,
        descripcion: inputPaso,
      };
      setPasosEditados([...pasosEditados, nuevoPaso]);
      setInputPaso("");
    }
  };

  const eliminarIngrediente = (index: number) => {
    setIngredientesEditados((prevIngredientesEditados) =>
      prevIngredientesEditados.filter((_, i) => i !== index)
    );
  };

  const eliminarPaso = (index: number) => {
    setPasosEditados((prevPasos) =>
      prevPasos
        .filter((_, i) => i !== index)
        .map((paso, i) => ({ numero: i + 1, descripcion: paso.descripcion }))
    );
    setNumeroPasos(numeroPasos - 1);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length <= 5) {
      const files = Array.from(event.target.files);

      // Guarda las previsualizaciones de las imágenes
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setImagesPreview(imagePreviews);

      console.log(imagePreviews);

      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // limpiar "data:image/jpeg;base64," del resultado
              let base64Data = reader.result as string;
              base64Data = base64Data.split(",")[1];
              resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      ).then((base64files: any) => {
        // Para actualizar las imagenes a las nuevas imagenes convertidas a base64
        setImages((prevImages) => [...prevImages, ...base64files]);
      });
    } else {
      toast.error("Solo puedes cargar un máximo de 5 imágenes.");
    }
  };

  const handleRemoveImage = (index: number) => {
    // Elimina la imagen seleccionada de ambas listas de imágenes
    setImages((images) => images.filter((_, imgIndex) => imgIndex !== index));
    setImagesPreview((imagesPrev) =>
      imagesPrev.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleRemoveCategory = (index: number) => {
    const removedCategory = selectedCategories[index];
    setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
    setAllCategories([...Allcategories, removedCategory]);
  };

  const handleSelect = (category: Tag | null) => {
    if (category) {
      setSelectedCategories([...selectedCategories, category]);
      setAllCategories(
        Allcategories.filter((cat) => cat.idTag !== category.idTag)
      );
    }
  };

  const onSubmit: SubmitHandler<FormRecetasInputs> = async (values) => {
    const valoresActualizados = {
      ...values,
      ingredientesReceta: ingredientesEditados,
      pasosReceta: pasosEditados,
      categoriasReceta: selectedCategories.map((cat) => cat.idTag),
      imagenesReceta: images,
    };

    const result = await editRecipe(valoresActualizados);
    if (result) {
      toast.success("Receta editada con éxito!");
      onClose();
      window.location.reload();
    } else {
      toast.error("Hubo un error al editar la receta");
    }
    // await createRecipe(valoresActualizados) ? onClose() : console.log('error'); // Agregar pop-up
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-[1400px] h-[900px] overflow-y-auto bg-white rounded mt-5">
            <button
              className="bg-red-500 text-white text-xl font-normal rounded-full px-2 float-right"
              onClick={() => onClose()}
            >
              X
            </button>
            <div className="bg-white rounded  px-20">
              <div className="px-4 py-3 overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* NombreReceta */}
                  <div className="mb-4">
                    <label htmlFor="nombreReceta" className="block mb-2">
                      Nombre:
                    </label>
                    <input
                      {...register("nombreReceta")}
                      type="text"
                      name="nombreReceta"
                      id="nombreReceta"
                      placeholder="Ingresa el nombre de la receta"
                      className="block w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      defaultValue={receta?.nombre}
                    />
                    {errors.nombreReceta && (
                      <div className="text-red-500 text-sm">
                        {errors.nombreReceta.message}
                      </div>
                    )}
                  </div>
                  {/* Descripcion */}
                  <div className="mb-4">
                    <label htmlFor="descripcionReceta" className="block mb-2">
                      Descripción:
                    </label>
                    <textarea
                      {...register("descripcionReceta")}
                      name="descripcionReceta"
                      id="descripcionReceta"
                      placeholder="Ingresa la descripción de la receta"
                      className="block w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      defaultValue={receta?.descripcion}
                    />
                    {errors.descripcionReceta && (
                      <div className="text-red-500 text-sm">
                        {errors.descripcionReceta.message}
                      </div>
                    )}
                  </div>
                  {/* Ingredientes Receta */}
                  <div className="mb-4">
                    <label htmlFor="ingredientesReceta" className="block mb-2">
                      Ingredientes:
                    </label>
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
                        {ingredientesEditados.map((ingrediente, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center mb-1"
                          >
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
                  {/* Pasos de la receta */}
                  <div className="mb-4">
                    <label htmlFor="pasosReceta" className="block mb-2">
                      Pasos:
                    </label>
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
                        {pasosEditados.map((paso, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center mb-1"
                          >
                            <div>
                              {paso.numero}. {paso.descripcion}
                            </div>
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
                  {/* Categorias de la receta */}
                  <div>
                    <Autocomplete
                      options={Allcategories}
                      getOptionLabel={(option) => option.nombreTag}
                      onChange={(_, value) => handleSelect(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecciona una categoría"
                          variant="outlined"
                        />
                      )}
                      style={{ marginBottom: "1rem" }}
                    />
                    <div className="mt-4 border border-gray-200 p-2 max-h-20 overflow-auto">
                      {selectedCategories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-1"
                        >
                          <span>{category.nombreTag}</span>
                          <IconButton
                            onClick={() => handleRemoveCategory(index)}
                            className="bg-red-500 text-white px-2 py-1 text-xs rounded-md focus:outline-none"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selector de imagenes */}
                  <div className="my-4" id="selectorImagenes">
                    <label className="customFileUpload">
                      Seleccionar imágenes
                      <input
                        type="file"
                        name="imagenesReceta"
                        id="imagenesReceta"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                        style={{ display: "none" }}
                      />
                    </label>
                    <div className="imagePreviewContainer">
                      {imagesPreview.map((src, index) => (
                        <div key={index} className="imagePreviewWrapper">
                          <img
                            src={src}
                            alt="Vista previa de imagen seleccionada"
                            className="imagePreview"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="imageRemoveButton"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
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
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EditarReceta;
