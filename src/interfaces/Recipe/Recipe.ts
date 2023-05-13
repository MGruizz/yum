interface Recipe {
    titulo: string;
    subtitulo: string;
    imageUrl: string;
}

interface PopularRecipe {
    id: string;
    nombre: string;
    descripcion: string;
    visitas: string;
    likes: string;
}

type PopularRecipes = Recipe[];