import { TankCapacity, TankRequestType, TankStatus } from "../interfaces";

export const tankStatus: { [key in TankStatus]: string } = {
    [TankStatus.DELIVERED]: 'Entregado',
    [TankStatus.RETURNED]: 'Devuelto',
    [TankStatus.RECHARGE]: 'Recarga',
};

export const tankRequestType: { [key in TankRequestType]: string } = {
    [TankRequestType.PATIENT]: 'Paciente',
    [TankRequestType.SERVICE]: 'Servicio',
    [TankRequestType.EXTERNAL]: 'Externo',
};

export const tankCapacity: { [key in TankCapacity]: string } = {
    [TankCapacity.SIX_M2]: '6m2',
    [TankCapacity.TEN_M2]: '10m2',
    [TankCapacity.THREE_M3]: '3m3',
}