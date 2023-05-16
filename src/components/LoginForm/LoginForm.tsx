import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginValidate } from '../../utils/validators';
import { loginUser } from '../../api/usersApi';
import { saveToken } from '../../api/authApi';
import { LoginFormValues } from '../../features/user/userInterfaces';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function LoginForm() {

  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const token = await loginUser(values);

      if (token) {
        saveToken(token);
        setAuthenticated(true);
        navigate('/', { replace: true });
      }
    } catch (error) {
      throw new Error("Error al iniciar sesión:" + error);
    }
  };

  return (

    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className={`w-full px-4 py-2 text-gray-700 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:border-indigo-500`}
            />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              className={`w-full px-4 py-2 text-gray-700 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:border-indigo-500`}
            />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>
          <button
            type="submit"
            className="sm:w-full px-12 sm:mx-0 sm:px-4 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-green-900 transition-colors duration-100"
          >
            Iniciar sesión
          </button>
        </Form>
      )}
    </Formik>

  );
}

export default LoginForm;