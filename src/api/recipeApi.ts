import axios from 'axios'
import { Ingredient, Recipe, Step, Comment , RecipeFull} from '../features/recipe/recipeInterfaces';

export const createRecipe = async (data: any) => {
  try {
    // Hacer la solicitud POST
    const response = await axios.post(`http://localhost:3000/recetas/`, data);
    if (response.data.res == 'Inserción exitosa') {
      return true;
    }
    return false;
  } catch (error) {
    // Si hay algún error, mostrarlo en la consola y devolver null
    console.error(error);
    return false;
  }
}

export const getPopularRecipes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/recetas/recetasPopulares/');
    const popularRecipes = response.data.popularRecipes;
    return popularRecipes;
  } catch (error) {
    console.error(error);
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/recetas/categorias/');
    const categorias = response.data;
    return categorias;
  } catch (error) {
    console.error(error);
  }
}

export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    console.log("id?" + id + "wat japen")
    const response = await axios.get<Recipe>(`http://localhost:3000/receta/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener receta.');
  }
};

export const getStepsByRecipeId = async (id: string): Promise<Step[]> => {
  try {
    const response = await axios.get<Step[]>(`http://localhost:3000/pasos/receta/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los pasos de la receta.');
  }
};

export const getIngredientsByRecipeId = async (id: string): Promise<Ingredient[]> => {
  try {
    const response = (await axios.get<Ingredient[]>(`http://localhost:3000/ingredientes/receta/${id}`));
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los ingredientes de la receta.');
  }
};

export const getCommentsByRecipeId = async (id: string): Promise<Comment[]> => {
  try {
    const response = (await axios.get<Comment[]>(`http://localhost:3000/comentarios/receta/${id}`));
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los comentarios de la receta.');
  }
};

export const getRecipesFullByUserId = async (id: string): Promise<RecipeFull[]> => {
  try {
    const response = await axios.get(`http://localhost:3000/imagenes/receta/${id}`); // Cambia esta URL al endpoint correcto en tu backend
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// export const getImagesRecipe = async (id: string) => {
//   try {
//     const response = (await axios.get(`http://localhost:3000/imagenes/receta/${id}`));
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };