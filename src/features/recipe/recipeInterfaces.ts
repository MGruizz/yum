export interface Recipe{
    idRecipe: number;
    descripcion: string;
    userId: number;
    fechaCreacion: string;
    fechaUpdate:string;
    eliminado: boolean;
    nombre: string;
    likes: number;
    views: number;
}

export interface Step{
    idStep: number;
    recetaId: number;
    orden: number;
    descripcion: string;
}

export interface Ingredient{
    idIngredient: number;
    recetaId: number;
    nombre: number;
}

export interface Comment{
    idComment: number;
    descripcion: string;
    usuarioId: number;
    recetaId: number;
}