import instance from "./axiosInstance";

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await instance.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Mapear a futuro
interface LoginFormValues {
  email: string;
  password: string;
}

export const loginUser = async (values: LoginFormValues) => {
  try {
    const response = await instance.post("/login/", {
      email: values.email,
      password: values.password,
    });
    console.log(response.data, "Funciona ");
    return response.data;
  } catch (error) {
    console.log("No funciona, osea si funciona ")
    throw error;
  }
};

//Mapear a futuro
export interface User {
  idUser: number;
  username:  string;
  email: string;
  descripcion: string;
}


export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await instance.get<User>(`/usuarios/:${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener información del usuario');
  }
};