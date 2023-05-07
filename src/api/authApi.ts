
export const saveToken = (token: string) => {
    const expiresIn = 60 * 1000;
    const expirationTime = new Date().getTime() + expiresIn;
    localStorage.setItem('authToken', JSON.stringify(token));
    localStorage.setItem('authTokenExpiration', expirationTime.toString());
}

export const removeToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
};

export const getToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    const tokenExpiration = localStorage.getItem('authTokenExpiration');

    if (!token || !tokenExpiration) {
        return null;
    }

    const currentTime = new Date().getTime();

    if (currentTime > parseInt(tokenExpiration, 10)) {
        removeToken();
        return null;
    }

    return token;
};