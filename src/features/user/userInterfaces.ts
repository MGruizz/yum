export interface User {
    userId: number;
    username: string;
    email: string;
    descripcion: string;
    fotoPerfil: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    isAdmin: string;   
}
export interface LoginFormValues {
    email: string;
    password: string;
  }