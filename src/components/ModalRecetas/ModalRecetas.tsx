import React, { useEffect, useState } from "react";
import { ModalRecetasProps } from "../../interfaces/ModalRecetasProps/ModalRecetasProps";
import { CSSTransition } from "react-transition-group";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Comentarios from "../Comentarios/Comentarios";
import { getIngredientsByRecipeId, getRecipeById, getStepsByRecipeId } from "../../api/recipeApi";
import { getUserById } from "../../api/usersApi";
import { User } from "../../features/user/userInterfaces";
import { Ingredient, Recipe, Step } from "../../features/recipe/recipeInterfaces";
import { mapDbObjectToIngredient, mapDbObjectToRecipe, mapDbObjectToSteps } from "../../utils/mapper";

const ModalRecetas: React.FC<ModalRecetasProps> = ({
  isVisible,
  onClose,
  recipeId
}) => {

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRecipe = await getRecipeById(recipeId);
        const recipe: Recipe = mapDbObjectToRecipe(fetchedRecipe);
        setRecipe(recipe);

        if (recipe.userId) {
          console.log("1")
          const fetchedUser = await getUserById(recipe.userId.toString());
          console.log("2")
          setUser(fetchedUser);
        }

        if (recipeId) {
          const fetchedSteps = await getStepsByRecipeId(recipeId);
          const mappedSteps = fetchedSteps.map(mapDbObjectToSteps);
          setSteps(mappedSteps);

          const fetchedIngredients = await getIngredientsByRecipeId(recipeId);
          const mappedIngredients = fetchedIngredients.map(mapDbObjectToIngredient);
          setIngredients(mappedIngredients);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [recipeId]);


  const [showPasos, setShowPasos] = useState(false);

  const togglePasos = () => {
    setShowPasos(!showPasos);
  };
  const [showIngredientes, setShowIngredientes] = useState(false);

  const toggleIngredientes = () => {
    setShowIngredientes(!showIngredientes);
  };

  const customSizeLg = {
    width: 400,
    height: 600,
  };
  const customSizeMd = {
    width: 200,
    height: 300,
  };
  const customSizeSm = {
    width: 250,
    height: 750,
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
          <div className="w-10/12 h-[30rem] sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12 relative">
            <button
              className="bg-red-500 text-white text-xl font-normal rounded-full px-2 absolute top-2 right-2"
              onClick={() => onClose()}
            >X</button>
            <div className="bg-white rounded mt-5">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-star-1 md:col-end-2">
                  <img
                    className="object-cover overflow-hidden w-full h-full md:h-[35rem] lg:h-[35rem]"
                    src="https://via.placeholder.com/200x270"
                    alt=""
                  />
                </div>
                <div className="md:col-start-2 md:col-end-4">
                  {/* Nuevo contenedor con scroll */}
                  <div className="mt-5 pr-5 pl-5 pb-5 h-[30rem] overflow-y-scroll">
                    {/* User */}
                    <div className="flex items-center mb-5">
                      <img
                        // src="https://via.placeholder.com/150"
                        src={user?.foto_perfil}
                        alt="Nombre del usuario"
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <p className="text-xl font-semibold">{user?.username}</p>
                    </div>
                    {/* Titulo */}
                    <h2 className="text-3xl font-bold text-left mb-3">
                      {recipe?.nombre}
                    </h2>
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
                            <p key={step.orden} className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2">
                              <strong>Paso {step.orden}: </strong>{step.descripcion}
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
                            <p key={ingredients.idIngredient} className="text-lg text-left bg-slate-300 rounded-full px-5 mb-2">
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
                    <Comentarios />
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
