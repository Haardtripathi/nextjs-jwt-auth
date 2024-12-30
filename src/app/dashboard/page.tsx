// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '../store/auth.store';
// import { StatsCard } from '../components/dashboard/stats-card';
// import { Activity, Users, DollarSign, TrendingUp, Loader } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function DashboardPage() {
//     const { isAuthenticated, isLoading } = useAuthStore();
//     const router = useRouter();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             router.push('/login');
//         }
//     }, [isAuthenticated, router]);

//     if (isLoading || !isAuthenticated) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Loader className="w-12 h-12 animate-spin text-primary" />
//             </div>
//         );
//     }

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1
//         }
//     };

//     return (
//         <div className="flex-1 space-y-8 p-8 pt-6 bg-gradient-to-br from-background to-secondary/10">
//             <div className="flex items-center justify-between space-y-2">
//                 <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
//             </div>
//             <motion.div
//                 className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//             >
//                 <motion.div variants={itemVariants}>
//                     <StatsCard
//                         title="Total Users"
//                         value="1,234"
//                         icon={<Users className="h-6 w-6 text-primary" />}
//                         trend="+5.2%"
//                     />
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                     <StatsCard
//                         title="Active Now"
//                         value="321"
//                         icon={<Activity className="h-6 w-6 text-green-500" />}
//                         trend="+2.4%"
//                     />
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                     <StatsCard
//                         title="Revenue"
//                         value="$45,231"
//                         icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
//                         trend="+8.1%"
//                     />
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                     <StatsCard
//                         title="Growth"
//                         value="+12.5%"
//                         icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
//                         trend="+3.2%"
//                     />
//                 </motion.div>
//             </motion.div>
//         </div>
//     );
// }


'use client';

import { useAuthStore } from '../store/auth.store';
import { StatsCard } from '../components/dashboard/stats-card';
import { Activity, Users, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/app/components/protected-route';

export default function DashboardPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <ProtectedRoute requireAuth={true}>
            <div className="flex-1 space-y-8 p-8 pt-6 bg-gradient-to-br from-background to-secondary/10">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <StatsCard
                            title="Total Users"
                            value="1,234"
                            icon={<Users className="h-6 w-6 text-primary" />}
                            trend="+5.2%"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsCard
                            title="Active Now"
                            value="321"
                            icon={<Activity className="h-6 w-6 text-green-500" />}
                            trend="+2.4%"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsCard
                            title="Revenue"
                            value="$45,231"
                            icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
                            trend="+8.1%"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <StatsCard
                            title="Growth"
                            value="+12.5%"
                            icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
                            trend="+3.2%"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </ProtectedRoute>
    );
}

