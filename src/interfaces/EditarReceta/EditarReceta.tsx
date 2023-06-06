import {
    Comment,
    Ingredient,
    Recipe,
    Step,
    Tag,
  } from "../../features/recipe/recipeInterfaces";

export interface EditarRecetaProps {
    isVisible: boolean;
    onClose: () => void;
    receta: Recipe | null;
    ingredientes: Ingredient[] | null;
    pasos: Step[] | null;
    tags: Tag[] | null;
}
export interface FormRecetasInputs {
    nombreReceta: string;
    descripcionReceta: string;
    ingredientesReceta: string[];
    pasosReceta: string[];
    //imagenes: string[];
}