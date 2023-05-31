import axios from 'axios'
import { toast } from 'react-toastify';

export const getPopularCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/tags/popularTags/');
       
        const popularCategories = response.data.popularCategories;
        return popularCategories;
    } catch (error) {
        console.error(error);
    }
}

export const searchByCategory = async (category: string) => {
    try {
        console.log('category', category);
        
        const response = await axios.get(`http://localhost:3000/recetas/searchByCategory/${category}`);
        const searchByCategory = response.data;
        console.log('response', response.data)
        return searchByCategory;
    } catch (error) {
        console.error(error);
    }
}

export const createCategory = async (nombre: any) => {
    try {
        const response = await axios.post('http://localhost:3000/tags/', {nombre});
        const newCategory = response.data;
        return newCategory;
    } catch (error: any ) {        
        toast.error(error.response.data.Error || 'Error al crear la categoria');
        console.error(error);
    }
}