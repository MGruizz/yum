import React, { useEffect, useState, useRef } from "react";
import { ModalRecetasProps } from "../../interfaces/ModalRecetasProps/ModalRecetasProps";
import { CSSTransition } from "react-transition-group";
import { FiChevronDown, FiChevronUp, FiHeart } from "react-icons/fi";
import Comentarios from "../Comentarios/Comentarios";
import {
  getCommentsByRecipeId,
  getIngredientsByRecipeId,
  getRecipeById,
  getStepsByRecipeId,
  getTagsByRecipeId,
} from "../../api/recipeApi";
import {
  getUserById,
  isLikingRecipe,
  likeRecipe,
  unlikeRecipe,
} from "../../api/usersApi";
import { User } from "../../features/user/userInterfaces";
import {
  Comment,
  Ingredient,
  Recipe,
  Step,
  Tag,
} from "../../features/recipe/recipeInterfaces";
import {
  mapDbObjectToComment,
  mapDbObjectToIngredient,
  mapDbObjectToRecipe,
  mapDbObjectToSteps,
  mapDbObjectToTag,
} from "../../utils/mapper";
import { getUserToken } from "../../api/authApi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { ButtonWithMenuProps } from "../../interfaces/ButtonWithMenuProps/ButtonWithMenuProps";
import Chip from "@mui/material/Chip";

const ModalRecetas: React.FC<ModalRecetasProps> = ({
  isVisible,
  onClose,
  recipeId,
}) => {
  const [showPasos, setShowPasos] = useState(false);
  const [showIngredientes, setShowIngredientes] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = getUserToken() != null ? getUserToken()?.id : null;
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Tag[] | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (recipeId) {
          if (userId) {
            // Verificar si el usuario logueado ya dió like a la receta
            const userData = await getUserById(String(userId));
            setUserLogged(userData);
            setIsLiked(await isLikingRecipe(userId, parseInt(recipeId)));
          }

          // Obtener receta
          const fetchedRecipe = await getRecipeById(recipeId);
          const recipe: Recipe = mapDbObjectToRecipe(fetchedRecipe);
          setRecipe(recipe);

          if (recipe.userId) {
            // Obtener usuario propetario de la receta
            const fetchedUser = await getUserById(recipe.userId.toString());
            setUser(fetchedUser);
          }

          // Obtener pasos
          const fetchedSteps = await getStepsByRecipeId(recipeId);
          const mappedSteps = fetchedSteps.map(mapDbObjectToSteps);
          setSteps(mappedSteps);

          // Obtener ingredientes
          const fetchedIngredients = await getIngredientsByRecipeId(recipeId);
          const mappedIngredients = fetchedIngredients.map(
            mapDbObjectToIngredient
          );
          setIngredients(mappedIngredients);

          // Obtener comentarios
          const fetchedComments = await getCommentsByRecipeId(recipeId);
          const mappedComments = fetchedComments.map(mapDbObjectToComment);
          setComments(mappedComments);

          // Obtener tags
          const fetchedCategorias = await getTagsByRecipeId(recipeId);
          const mappedCategorias = fetchedCategorias.map(mapDbObjectToTag);
          setCategorias(mappedCategorias);
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [recipeId]);

  const handleLike = async () => {
    try {
      if (userId) {
        await likeRecipe(userId, recipeId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      if (userId) {
        await unlikeRecipe(userId, recipeId);
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasos = () => {
    setShowPasos(!showPasos);
  };

  const toggleIngredientes = () => {
    setShowIngredientes(!showIngredientes);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action: string) => {
    setIsOpen(false);
    if (action === "Editar receta") handleEditRecipe();
    if (action === "Eliminar receta") handleDeleteRecipe();
  };

  const handleEditRecipe = () => {
    // Abre el modal para editar la receta.
  };

  const handleDeleteRecipe = () => {
    // Muestra un popup para confirmar la eliminación de la receta.
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutsideModal = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target && target.id === "wrapper") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener(
      "mousedown",
      handleClickOutsideModal as EventListener
    );
    return () => {
      window.removeEventListener(
        "mousedown",
        handleClickOutsideModal as EventListener
      );
    };
  }, []);

  return (
    <div>
      {isVisible && !isLoading && (
        <div
          id="wrapper"
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="w-10/12 h-[30rem] sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 relative">
            <button
              className="bg-blue-500 text-white text-xl font-normal rounded-full px-3 right-10 top-2 absolute"
              onClick={() => handleButtonClick()}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {isOpen && (
              <div
                ref={menuRef}
                className="origin-top-right absolute right-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <a
                    onClick={() => handleMenuClick("Editar receta")}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                  >
                    Editar receta
                  </a>
                  <a
                    onClick={() => handleMenuClick("Eliminar receta")}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                  >
                    Eliminar receta
                  </a>
                </div>
              </div>
            )}
            <button
              className="bg-red-500 text-white text-xl font-normal rounded-full px-2 absolute top-2 right-2"
              onClick={() => onClose()}
            >
              X
            </button>
            <div className="bg-white rounded mt-5">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-star-1 md:col-end-2">
                  <img
                    className="object-cover overflow-hidden w-full h-full md:h-[35rem] lg:h-[35rem]"
                    src={recipe?.imagenes[0]}
                    alt=""
                  />
                </div>
                <div className="md:col-start-2 md:col-end-4">
                  {/* Nuevo contenedor con scroll */}
                  <div className="mt-5 pr-5 pl-5 pb-5 h-[30rem] overflow-y-scroll">
                    {/* User */}
                    <div className="flex items-center ">
                      <img
                        // src="https://via.placeholder.com/150"
                        src={user?.foto_perfil}
                        alt="Nombre del usuario"
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <a
                        className="text-xl font-semibold"
                        href={`/profile/${user?.id}`}
                      >
                        {user?.username}
                      </a>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-3xl font-bold text-left">
                        {recipe?.nombre}
                      </h2>
                      <button
                        onClick={isLiked ? handleUnlike : handleLike}
                        className="text-xl font-normal rounded-full px-2"
                      >
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                      </button>
                    </div>
                    {/* {TAGS} */}
                    <div className="flex justify-between items-center my-2">
                      <h2 className="text-gray-600">Tags:</h2>
                      <div className="flex flex-wrap">
                        {categorias && categorias?.length > 0 ? categorias.map((cat) => (
                          <span
                            key={cat.idTag} 
                            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
                          >
                            {cat.nombreTag}
                          </span>
                        )):
                        <span
                            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
                          > No tiene categoria</span>
                        }
                      </div>
                    </div>
                    {/* Descricion */}
                    <p className="text-lg text-left mb-7">
                      {recipe?.descripcion}
                    </p>
                    {/* Pasos */}
                    <div className="relative">
                      <button
                        className="w-full  flex items-center justify-between text-xl focus:outline-none"
                        onClick={togglePasos}
                      >
                        <span>Pasos</span>
                        {showPasos ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      <CSSTransition
                        in={showPasos}
                        timeout={300}
                        classNames="expand"
                        unmountOnExit
                      >
                        <div className="mt-2">
                          {steps?.map((step) => (
                            <p
                              key={step.orden}
                              className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2"
                            >
                              <strong>Paso {step.orden}: </strong>
                              {step.descripcion}
                            </p>
                          ))}
                        </div>
                      </CSSTransition>
                      <style>{`
                        .expand-enter {
                        max-height: 0;
                        opacity: 0;
                        }
                        .expand-enter-active {
                        max-height: 80px;
                        opacity: 1;
                        transition: max-height 300ms, opacity 300ms;
                        }
                        .expand-exit {
                        max-height: 80px;
                        opacity: 1;
                        }
                        .expand-exit-active {
                        max-height: 0;
                        opacity: 0;
                        transition: max-height 300ms, opacity 300ms;
                        }
                    `}</style>
                    </div>

                    {/* Ingredientes  */}
                    <div className="relative my-3">
                      <button
                        className="w-full  flex items-center justify-between text-xl focus:outline-none"
                        onClick={toggleIngredientes}
                      >
                        <span>Ingredientes</span>
                        {showIngredientes ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      <CSSTransition
                        in={showIngredientes}
                        timeout={300}
                        classNames="expand"
                        unmountOnExit
                      >
                        <div className="mt-2">
                          {ingredients?.map((ingredients) => (
                            <p
                              key={ingredients.idIngredient}
                              className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2"
                            >
                              {ingredients.nombre}
                            </p>
                          ))}
                        </div>
                      </CSSTransition>
                      <style>{`
                        .expand-enter {
                        max-height: 0;
                        opacity: 0;
                        }
                        .expand-enter-active {
                        max-height: 80px;
                        opacity: 1;
                        transition: max-height 300ms, opacity 300ms;
                        }
                        .expand-exit {
                        max-height: 80px;
                        opacity: 1;
                        }
                        .expand-exit-active {
                        max-height: 0;
                        opacity: 0;
                        transition: max-height 300ms, opacity 300ms;
                        }
                    `}</style>
                    </div>
                    {/* Comentarios */}
                    {userLogged != null && recipe != null && comments ? (
                      <Comentarios
                        comments={comments}
                        usuarioLogeado={userLogged}
                        idReceta={String(recipe?.idRecipe)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalRecetas;
