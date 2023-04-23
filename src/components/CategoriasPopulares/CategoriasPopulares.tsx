import React from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const categoriasPopulares = [
    {
        Titulo: "Categoria 1",
        Subtitulo: "Subtitulo 1",
    },
    {
        Titulo: "Categoria 2",
        Subtitulo: "Subtitulo 2",
    },
    {
        Titulo: "Categoria 3",
        Subtitulo: "Subtitulo 3",
    },
    {
        Titulo: "Categoria 3",
        Subtitulo: "Subtitulo 3",
    }
]

const CategoriasPopulares = () => {

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Categorías Populares</h1>
            <div className="flex flex-wrap gap-4 justify-center px-4">
                {categoriasPopulares.map((categoria,index) => (
                    <div className="flex-shrink-0" key={index}>
                        <CategoryCard
                            title={categoria.Titulo}
                            subtitle={categoria.Subtitulo}
                            imageUrl='https://via.placeholder.com/200x270'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriasPopulares