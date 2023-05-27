import React,{useState,useEffect} from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import {PopularCategories} from '../../interfaces/Categories/Categories';
import { getPopularCategories } from '../../api/categoriesApi';

const CategoriasPopulares = () => {

    const [categoriasPopulares, setCategoriasPopulares] = useState<PopularCategories[]>([]);

    useEffect(() => {
        getPopularCategories()
            .then(data => {                
                setCategoriasPopulares(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Categorías Populares</h1>
            <div className="flex flex-wrap gap-4 justify-center px-4">
                {categoriasPopulares.map((categoria,index) => (
                    <div className="flex-shrink-0" key={index}>
                        <CategoryCard
                            title={categoria.nombre}
                            imageUrl='https://via.placeholder.com/200x270'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriasPopulares