import axios from "./axiosInstance";
import { User , LoginFormValues} from "../features/user/userInterfaces";
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log('Error',error);
    
  }
};

//Mapear a futuro


export const loginUser = async (values: LoginFormValues) => {
  try {
    const response = await axios.post("/usuarios/login/", {
      email: values.email,
      password: values.password,
    });
    console.log(response.data, "Funciona ");
    return response.data;
  } catch (error) {
    console.log('Error',error);
  }
};

//Mapear a futuro



export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener información del usuario');
  }
};