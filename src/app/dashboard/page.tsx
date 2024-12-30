'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth.store';
import { StatsCard } from '../components/dashboard/stats-card';
import { Activity, Users, DollarSign, LineChart } from 'lucide-react';
import { Loader } from "lucide-react";

export default function DashboardPage() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Users"
                    value="1,234"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                    title="Active Now"
                    value="321"
                    icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                    title="Revenue"
                    value="$45,231"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                />
                <StatsCard
                    title="Growth"
                    value="+12.5%"
                    icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
                />
            </div>
        </div>
    );
}

