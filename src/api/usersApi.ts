import instance from './axiosInstance';

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await instance.post('/auth/register', {
            email,
            password,
        });
        return response.data;
    } catch (error) {

        throw error;
    }
};