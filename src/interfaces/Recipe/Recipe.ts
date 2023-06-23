export interface Recipe {
    id?: number;
    nombre: string;
    descripcion: string;
    visitas: string;
    likes: string;
    imagenes: string[];
    created_at?:string;
}

export interface PopularRecipe {
    id: string;
    nombre: string;
    descripcion: string;
    visitas: string;
    likes: string;
    imagen: string; //url
}

type PopularRecipes = Recipe[];