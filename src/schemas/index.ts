import * as yup from "yup";
import { CylinderCapacity } from "../interfaces";

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
});

export const patientSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  rut: yup
    .string()
    .matches(/^(\d{1,3}(\.?\d{3}){2}-[\dkK])$/, {
      message: "El rut no es válido",
    })
    .required("El rut es requerido"),
});

export const cylinderSchema = yup.object().shape({
  serialNumber: yup.string().required("El número de serie es requerido"),
  capacity: yup.mixed<CylinderCapacity>().oneOf(Object.values(CylinderCapacity)).required("La capacidad es requerida"),
})

// export const tankPatientSchema = yup.object().shape({
//   number_tank: yup.string().when("capacity", ([capacity], schama) => {
//     return capacity === TankCapacity.THREE_M3
//       ? schama.notRequired()
//       : schama
//           .required("El número de cilindro es requerido")
//           .min(3)
//           .required("El número de cilindro es requerido");
//   }),
//   request_type: yup
//     .mixed<TankRequestType>()
//     .oneOf(Object.values(TankRequestType))
//     .required("El tipo de solicitud es requerido"),
//   capacity: yup
//     .mixed<TankCapacity>()
//     .oneOf(Object.values(TankCapacity))
//     .required("La capacidad es requerida"),
//   status: yup.mixed<TankStatus>().when("capacity", ([capacity], schema) => {
//     return capacity === TankCapacity.THREE_M3
//       ? schema
//           .oneOf([TankStatus.RECHARGE], "Solo puede ser recargado")
//       : schema
//           .oneOf(
//             [TankStatus.DELIVERED, TankStatus.RETURNED],
//             "Solo puede ser entregado o devuelto"
//           )
//   }).required("El estado es requerido"),
//   patient_id: yup.number().nullable(),
// });
