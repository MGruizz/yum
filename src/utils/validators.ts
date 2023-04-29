import * as Yup from 'yup';

export const RegisterValidate = Yup.object().shape({
    email: Yup.string().trim().required("El email es requerido."),
    password: Yup.string().trim().required("El password es requerido."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir').required('Repetir contraseña es obligatorio'),
})