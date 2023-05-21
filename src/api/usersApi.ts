import instance from "./axiosInstance";
import axios from "axios";
import { User, LoginFormValues } from "../features/user/userInterfaces";
import { Recipe } from "../features/recipe/recipeInterfaces";
import { getToken, saveToken } from "../api/authApi";

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('Error', error);

  }
};

export const loginUser = async (values: LoginFormValues) => {
  try {
    const response = await instance.post("/usuarios/login/", {
      email: values.email,
      password: values.password,
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión:' + error);
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await instance.get<User>(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener información del usuario:' + error);
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

export const updateUserProfile = async (idUsuario: number, nombreUsuario: string, descripcion: string) => {
  const {token} = JSON.parse(getToken() || '{}');
  
  const response = await instance.put(
    `/usuarios/${idUsuario}`, 
    { nombreUsuario, descripcion },
    { headers: { 'Authorization': `Bearer ${token}` } }
  );  
  // saveToken(response.data.token);
  return response.data;
};
