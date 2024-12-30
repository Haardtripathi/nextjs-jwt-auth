'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/store/auth.store';

export function AuthInitializer() {
    const { isLoading } = useAuthStore();
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="spinner-border animate-spin w-12 h-12 border-4 rounded-full"></div>
            </div>
        );
    }

    return null;
}
