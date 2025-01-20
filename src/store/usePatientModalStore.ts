import { create } from "zustand";
import { Patient } from "../interfaces";

type ModalView = 'add';

interface ModalState {
    show: boolean;
    view: ModalView | null;

    handleClose: () => void;
    handleOpen: (view: ModalView) => void;

    data?: Patient | null;
}

export const usePatientModalStore = create<ModalState>((set) => ({
    show: false,
    view: null,
    data: null,

    handleClose: () => set({ show: false, view: null }), 
    handleOpen: (view: ModalView, data?: Patient) => set({ show: true, view: view, data: data || null }),
}));