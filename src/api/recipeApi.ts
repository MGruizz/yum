import axios from 'axios'
import { Ingredient, Recipe, Step, Comment , RecipeFull, Tag} from '../features/recipe/recipeInterfaces';
import { getToken } from './authApi';

export const createRecipe = async (data: any) => {
  try {
    const token = getToken();
    // Hacer la solicitud POST
    const response = await axios.post(`http://localhost:3000/recetas/`, data, { headers: { 'Authorization': `Bearer ${token}` } });
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

export const likesByRecipeId = async (receta_Id: number) => {

  try {
    const response = await axios.get("/recetas/likes", {
      params: {
        recetaId: receta_Id
      },
    });

    return response.data.cantidadLikes;
  } catch (error) {
    throw new Error('Error al retornar cantidad de likes:' + error);
  }
}

export const eliminarReceta = async (id: string) => {
  try {
    const response = await axios.put(`http://localhost:3000/recetas/eliminarreceta/${id}`);
    return response.data;
  } catch(error) {
    throw new Error('Error al eliminar receta.');
  }
}

export const searchRecipe = async (search: string) => {
  const data = {
    palabraclave : search
  }
  
  try {
    const response = await axios.post("http://localhost:3000/recetas/buscar",data);    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getTagsByRecipeId = async (id: string): Promise<Tag[]> => {
  try {
    const response = (await axios.get<Tag[]>(`http://localhost:3000/tags/tagsPorReceta/${id}`));
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los tags de la receta.');
  }
};

export const editRecipe = async (data: any) => {
  try {
    const token = getToken();
    // Hacer la solicitud POST
    const response = await axios.put(`http://localhost:3000/recetas/editreceta/`, data, { headers: { 'Authorization': `Bearer ${token}` } });
    if (response.data.res === 'Inserción exitosa') {
      return true;
    }
    return false;
  } catch (error) {
    // Si hay algún error, mostrarlo en la consola y devolver null
    console.error(error);
    return false;
  }
}

// export const getImagesRecipe = async (id: string) => {
//   try {
//     const response = (await axios.get(`http://localhost:3000/imagenes/receta/${id}`));
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };