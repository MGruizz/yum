export interface Recipe {
    id: number;
    nombre: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    eliminado: boolean;
    descripcion: string;
    cantidad_likes: number;
    cantidad_comentarios: number;
  }
  
 export interface RecipeList {
    recetas: Recipe[];
  }