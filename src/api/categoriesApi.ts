import axios from 'axios'

export const getPopularCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/tags/popularTags/');
       
        const popularCategories = response.data.popularCategories;
        return popularCategories;
    } catch (error) {
        console.error(error);
    }
}