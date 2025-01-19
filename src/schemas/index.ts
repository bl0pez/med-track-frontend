import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    email: yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido')
});