import { create, StateCreator } from "zustand";
import { User } from "../interfaces";
import { persist } from "zustand/middleware";

export interface AuthState {
    status: 'authenticated' | 'unauthenticated' | 'loading';
    token: string | null;
    user: User | null;

    login: (token: string, user: User) => void;
    setRefreshToken: (token?: string, user?: User) => void;
    logout: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'loading',
    token: null,
    user: null,

    login: (token, user) => {
        set({ status: 'authenticated', token, user });
    },
    logout: () => set({ status: 'unauthenticated', token: null, user: null }),

    setRefreshToken: (token, user) => {
        if (!token || !user) {
            return set({ status: 'unauthenticated', token: null, user: null });
        }

        set({ status: 'authenticated', token, user });
    }
});

export const useAuthStore = create<AuthState>()(
    persist(storeApi, {
        name: 'auth-storage',
    })
)