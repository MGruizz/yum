import * as Yup from 'yup';

export const RegisterValidate = Yup.object().shape({
    email: Yup.string().trim().required("El email es requerido."),
    password: Yup.string().trim().required("El password es requerido."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir').required('Repetir contraseña es obligatorio'),
    
});
export const LoginValidate = Yup.object({
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
});

export const validationSchema = Yup.object().shape({
  nombreReceta: Yup.string().required('Debe ingresar un nombre a la receta'),
  descripcionReceta: Yup.string().required('Debe ingresar una descripción para la receta'),
  ingredientesReceta: Yup.array().min(1, 'Debe ingresar al menos un ingrediente'),
  pasosReceta: Yup.array().min(1, 'Debe ingresar al menos un paso'),
  // fotoReceta: Yup.mixed().required('Debe cargar una foto de la receta'),
});
