import { create } from "zustand";
import { Patient } from "../interfaces";

type ModalView = 'add' | 'createTank' | 'barcodeScanner';

interface ModalState {
    show: boolean;
    view: ModalView | null;

    handleClose: () => void;
    handleOpen: (view: ModalView, data?: any) => void;

    data: any | null;
}

export const useModalStore = create<ModalState>((set) => ({
    show: false,
    view: null,
    data: null,

    handleClose: () => set({ show: false, view: null }), 
    handleOpen: (view: ModalView, data?: Patient) => set({ show: true, view: view, data: data || null }),
}));