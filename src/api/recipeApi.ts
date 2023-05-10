import axios from 'axios'

export const createRecipe = async (data: any) => {
    try {
        // Hacer la solicitud POST
        const response = await axios.post(`http://localhost:3000/recetas/`, data);
        return response.data;

    } catch (error) {
        // Si hay algún error, mostrarlo en la consola y devolver null
        console.error(error);
        return null;
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
    console.log(categorias);
    return categorias;
  } catch (error) {
    console.error(error);
  }
}

export default createRecipe;