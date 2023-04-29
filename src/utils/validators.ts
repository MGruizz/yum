import * as Yup from 'yup';

export const RegisterValidate = Yup.object().shape({
    email: Yup.string().trim().required("El email es requerido."),
    password: Yup.string().trim().required("El password es requerido."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir').required('Repetir contraseña es obligatorio'),
    
})
export const LoginValidate = Yup.object({
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
});