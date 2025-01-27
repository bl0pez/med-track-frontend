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
    [TankCapacity.THREE_M3]: '3m3',
    [TankCapacity.SIX_M3]: '6m3',
    [TankCapacity.TEN_M3]: '10m3',
}