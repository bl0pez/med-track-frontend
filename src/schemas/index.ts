import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    email: yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido')
});

export const patientSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido').min(3, 'El nombre debe tener al menos 3 caracteres'),
    rut: yup.string().matches(/^(\d{1,3}(\.?\d{3}){2}-[\dkK])$/, { message: 'El rut no es válido' }).required('El rut es requerido'),
});

export const tankSchema = yup.object().shape({});