import axios from 'axios'

const createRecipe = async (data: any) => {
    console.log(data)
    try {
        // Hacer la solicitud POST
        const response = await axios.post(`http://localhost:3000/recetas/`, data);
        console.log(response.data)
        return response.data;

    } catch (error) {
        // Si hay algún error, mostrarlo en la consola y devolver null
        console.error(error);
        return null;
    }
}

export default createRecipe;