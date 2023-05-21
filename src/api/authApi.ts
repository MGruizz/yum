import { User } from './../features/user/userInterfaces';

interface AuthObject {
    token: string;
    user:User;
}

export const saveToken = (objecto: AuthObject) => {
    const expiresIn = 60 * 1000;
    const expirationTime = new Date().getTime() + expiresIn;

    localStorage.setItem('authToken', objecto.token);
    localStorage.setItem('user', JSON.stringify(objecto.user));
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

    if (currentTime > parseInt(tokenExpiration, 30)) {
        removeToken();
        return null;
    }

    return token;
};

export const getUserToken = ():User|null => {
    const item = localStorage.getItem('user');
    if (item) {
        const user: User = JSON.parse(item);
        return user;
    }
    return null;
}
