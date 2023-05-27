import instance from "./axiosInstance";
import axios from "axios";
import { User, LoginFormValues } from "../features/user/userInterfaces";
import { Recipe } from "../features/recipe/recipeInterfaces";
import { getToken, saveToken } from "../api/authApi";
import { AuthObject } from '../interfaces/Token/Token';

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
  const token = getToken();

  const response = await instance.put(
    `/usuarios/${idUsuario}`,
    { nombreUsuario, descripcion },
    { headers: { 'Authorization': `Bearer ${token}` } }
  );

  const authObject: AuthObject = {
    token: response.data.token,
    user: response.data.user
  }

  saveToken(authObject);
  return response.data;
};

export const followUser = async (id_seguidor: number, id_seguido: number) => {
  try {
    const response = await instance.post("/usuarios/follow/", {
      id_usuario_seguido: id_seguido,
      id_usuario_seguidor: id_seguidor,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al seguir usuario:' + error);
  }
}


export const unfollowUser = async (id_seguidor: number, id_seguido: number) => {
  try {
    const response = await instance.post("/usuarios/unfollow/", {
      id_usuario_seguido: id_seguido,
      id_usuario_seguidor: id_seguidor,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al dejar de seguir usuario:' + error);
  }
}

export const isFollowingUser = async (id_seguidor: number, id_seguido: number) => {
  try {
    const response = await instance.post("/usuarios/follow/check/", {
      id_usuario_seguido: id_seguido,
      id_usuario_seguidor: id_seguidor,
    });
    return response.data.isFollowing;
  } catch (error) {
    throw new Error('Error al comprobar petición:' + error);
  }
}

export const likeRecipe = async (usuario_id: number, receta_Id: string) => {
  console.log("likeRecipe")
  try {
    const response = await instance.post("/usuarios/receta/like/", {
      usuarioId: usuario_id,
      recetaId: receta_Id,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Error al dar like a receta:' + error);
  }
}

export const unlikeRecipe = async (usuario_id: number, receta_Id: string) => {
  console.log("unlikeRecipe")
  try {
    const response = await instance.post("/usuarios/receta/unlike/", {
      usuarioId: usuario_id,
      recetaId: receta_Id,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error('Error dar unlike a receta:' + error);
  }
}

export const isLikingRecipe = async (usuario_id: number, receta_Id: number) => {

  try {
    const response = await instance.post("/usuarios/receta/isliked", {
      usuarioId: usuario_id,
      recetaId: receta_Id,
    });
    return response.data.isLiked;
  } catch (error) {
    throw new Error('Error al verificar like de receta:' + error);
  }
}

export const addComment = async (descripcion: string, idUsuario: string, idReceta:string) => {
  try {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await instance.post("/comentarios/", {
      descripcion: descripcion,
      usuario_id: idUsuario,
      receta_id: idReceta,
    },{headers});
    return response.data
  } catch (error) {
    throw new Error('Error al comentar' + error);
  }

};