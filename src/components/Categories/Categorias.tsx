import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/recipeApi";
import { Categories } from "../../interfaces/Categories/Categories";
import Select from "react-select";
import { OptionTypeBase, SingleValue } from 'react-select';

const Categorias: React.FC<Categories> = () => {
    const [categorias, setCategorias] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriasData = await getCategories();
            setCategorias(categoriasData);
        };
        fetchData();
    }, []);

    const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);

    const handleSelect = (selectedOption: SingleValue<OptionTypeBase>) => {
        if (selectedOption) {
            const { value } = selectedOption as { value: number; label: string };
            const category = categorias.find((cat) => cat.id === value);
            if (category) {
                setSelectedCategories([...selectedCategories, category]);
                setCategorias(categorias.filter((cat) => cat.id !== category.id));
            }
        }
    };

    const handleRemove = (index: number) => {
        const removedCategory = selectedCategories[index];
        setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
        setCategorias([...categorias, removedCategory]);
    };

    const options = categorias.map((category) => ({
        value: category.id,
        label: category.nombre,
    }));

    return (
        <div>
            <Select
                options={options}
                onChange={handleSelect}
                placeholder="Selecciona una categoría"
                isClearable
                isSearchable
            />
            <div className="mt-4 border border-gray-200 p-2 max-h-20 overflow-auto">
                {selectedCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                        <span>{category.nombre}</span>
                        <button
                            onClick={() => handleRemove(index)}
                            className="bg-red-500 text-white px-2 py-1 text-xs rounded-md focus:outline-none"
                        >
                            -
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorias;
