export interface User {
  id: number;
  username: string;
  email: string;
  descripcion: string;
  foto_perfil: string;
  is_admin?: Boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}


// Interfaces para mostrar información de Publicaciones, Seguidores y Seguidos en el perfil
export interface UserDetail {
  id: number;
  username: string;
}

export interface UserInformation {
  seguidores: {
    count: number;
    list?: UserDetail[];
  };
  seguidos: {
    count: number;
    list?: UserDetail[];
  };
  publicaciones: number;
}

