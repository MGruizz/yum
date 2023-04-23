import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { RegisterPageProps } from '../../interfaces/RegisterPage/RegisterPageProps';

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const imagen: string = "https://burst.shopifycdn.com/photos/fresh-vegetables-flatlay.jpg?width=1200&format=pjpg&exif=1&iptc=1";
    return (
        <div className="min-h-screen bg-red-100 flex items-center justify-center pt-5">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg md:flex md:gap-x-8 md:pl-8">
                <div className="w-full md:w-1/2 space-y-6 py-16 px-3">
                    <div className="space-y-6 pb-3">
                        <h1 className="text-6xl font-semibold text-gray-700 mt-5 pb-12">Registrate</h1>
                        <RegisterForm />
                    </div>
                </div>
                <div className="hidden md:block w-1/2">
                    <img
                        src={imagen}
                        alt="Login"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;