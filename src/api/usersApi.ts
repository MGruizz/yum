import instance from "./axiosInstance";
import { User , LoginFormValues} from "../features/user/userInterfaces";
import { Recipe } from "../features/recipe/recipeInterfaces";

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('Error',error);
    
  }
};




export const loginUser = async (values: LoginFormValues) => {
  try {
<<<<<<< HEAD
    const response = await axios.post("/usuarios/login/", {
=======
    const response = await instance.post("/login/", {
>>>>>>> 54cfc876b74624e6b5ff07b39b201ddcde9d108f
      email: values.email,
      password: values.password,
    });
    console.log(response.data, "Funciona ");
    return response.data;
  } catch (error) {
    console.log('Error',error);
  }
};





export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await instance.get<User>(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener información del usuario');
  }
};

export const getRecipesByUserId = async (id: string): Promise<Recipe[]> => {
  try {
    const response = await instance.get<Recipe[]>(`/recetas/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener información del usuario');
  }
};