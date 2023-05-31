export interface User {
    id: number;
    username:  string;
    email: string;
    descripcion: string;
    foto_perfil: string;
    is_admin?: Boolean;
  }

export interface LoginFormValues {
    email: string;
    password: string;
  }

