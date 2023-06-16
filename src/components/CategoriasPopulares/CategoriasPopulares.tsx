import React,{useState,useEffect} from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import {PopularCategories} from '../../interfaces/Categories/Categories';
import { getPopularCategories, searchByCategory } from '../../api/categoriesApi';
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

const CategoriasPopulares = () => {

    const navigate = useNavigate();
    const { setSearchResults } = useSearch();
    const [categoriasPopulares, setCategoriasPopulares] = useState<PopularCategories[]>([]);

    const searchByCategoryName = async (categoryName: string) => {
        const results = await searchByCategory(categoryName);
        setSearchResults(results);
        navigate('/search');
    }

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
                {categoriasPopulares && categoriasPopulares.map((categoria,index) => (
                    <div className="flex-shrink-0" key={index} onClick={() => searchByCategoryName(categoria.nombre)}>
                        <CategoryCard
                            title={categoria.nombre}
                            imageUrl={categoria.imagen}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriasPopulares