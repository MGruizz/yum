import { Ingredient, Recipe, Step } from "../features/recipe/recipeInterfaces";

export function mapDbObjectToRecipe(dbObject: any): Recipe {
    return {
        idRecipe: dbObject.id,
        descripcion: dbObject.descripcion,
        userId: dbObject.usuario_id,
        fechaCreacion: dbObject.created_at,
        fechaUpdate: dbObject.updated_at,
        eliminado: dbObject.deleted,
        nombre: dbObject.nombre,
        likes: dbObject.likes,
        views: dbObject.visitas
    };
}

export function mapDbObjectToSteps(dbObject: any): Step {
    return {
        idStep: dbObject.id,
        recetaId: dbObject.receta_id,
        orden: dbObject.numero,
        descripcion: dbObject.descripcion
    };
}

export function mapDbObjectToIngredient(dbObject: any): Ingredient {
    return {
        idIngredient: dbObject.id,
        recetaId: dbObject.receta_id,
        nombre: dbObject.nombre,

    };
}