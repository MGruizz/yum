import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RegisterFormProps } from '../../interfaces/RegisterForm/RegisterForm';
import { RegisterValidate } from '../../utils/validators';
import { registerUser } from '../../api/usersApi';

const RegisterForm: React.FC<RegisterFormProps> = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterValidate,
        onSubmit: async (values) => {
            try {
                const response = await registerUser(values.email, values.password);
                console.log('Usuario registrado con éxito:', response);
                navigate('/');
              } catch (error) {
                console.error('Error al registrar el usuario:', error);
              }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs">{formik.errors.password}</div>
                ) : null}
            </div>
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Repetir Contraseña</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
                ) : null}
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-green-900 transition-colors duration-100"
            >
                Registrate
            </button>
        </form>
    )
};

export default RegisterForm;