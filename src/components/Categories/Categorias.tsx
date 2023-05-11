import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/recipeApi";
import { Categories } from "../../interfaces/Categories/Categories";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { CategoriasRecetasProps } from "../../interfaces/CategoriasRecetasProps/CategoriasRecetasProps";
import CategoriasPopulares from "../CategoriasPopulares/CategoriasPopulares";

const Categorias: React.FC<CategoriasRecetasProps> = ({setCategories}) => {
  const [categorias, setCategorias] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriasData = await getCategories();
      setCategorias(categoriasData);
    };
    fetchData();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);

  const handleSelect = (category: Categories | null) => {
    if (category) {
      setSelectedCategories([...selectedCategories, category]);
      setCategorias(categorias.filter((cat) => cat.id !== category.id));
    }
  };

  const handleRemove = (index: number) => {
    const removedCategory = selectedCategories[index];
    setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
    setCategorias([...categorias, removedCategory]);
  };

  useEffect(() => {
    setCategories(selectedCategories.map(c => c.id))
  }, [categorias]) 

  return (
    <div>
      <Autocomplete
        options={categorias}
        getOptionLabel={(option) => option.nombre}
        onChange={(_, value) => handleSelect(value)}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona una categoría" variant="outlined" />
        )}
        style={{ marginBottom: "1rem" }}
      />
      <div className="mt-4 border border-gray-200 p-2 max-h-20 overflow-auto">
        {selectedCategories.map((category, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span>{category.nombre}</span>
            <IconButton
              onClick={() => handleRemove(index)}
              className="bg-red-500 text-white px-2 py-1 text-xs rounded-md focus:outline-none"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
