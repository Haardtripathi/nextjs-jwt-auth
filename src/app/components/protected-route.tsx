'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/auth.store';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth: boolean;
}

export function ProtectedRoute({ children, requireAuth }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (requireAuth && !isAuthenticated) {
                router.push('/login');
            } else if (!requireAuth && isAuthenticated) {
                router.push('/');
            }
        }
    }, [isLoading, isAuthenticated, requireAuth, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
        return <>{children}</>;
    }

    return null;
}
