export interface Recipe {
    id?: number;
    nombre: string;
    descripcion: string;
    visitas: string;
    likes: string;
    imageUrl: string;
    imagen?:string;
}

export interface PopularRecipe {
    id: string;
    nombre: string;
    descripcion: string;
    visitas: string;
    likes: string;
}

type PopularRecipes = Recipe[];