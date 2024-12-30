/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: true, // Initially set to true to check auth state on app load
            isAuthenticated: false,

            initialize: async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    set({ isLoading: false });
                    return;
                }

                try {
                    const response = await axios.get('/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = response.data;
                    set({
                        user: data.user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch {
                    localStorage.removeItem('token');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                } finally {
                    set({ isLoading: false });
                }
            },

            login: async (email: string, password: string) => {
                set({ isLoading: true });
                try {
                    const response = await axios.post('/api/auth/login', {
                        email,
                        password,
                    });

                    const data = response.data;

                    localStorage.setItem('token', data.token);
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                    });


                    toast.success('Logged in successfully');
                    return true
                } catch (error: any) {
                    toast.error(error.response?.data?.message || 'Failed to login');
                    return false
                } finally {
                    set({ isLoading: false });
                }
            },

            register: async (email: string, password: string) => {
                set({ isLoading: true });
                try {
                    await axios.post('/api/auth/register', {
                        email,
                        password,
                    });

                    toast.success('Registered successfully');
                    return true
                } catch (error: any) {

                    toast.error(error.response?.data?.message || 'Failed to register');
                    return false

                } finally {
                    set({ isLoading: false });
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
                toast.success('Logged out successfully');
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
