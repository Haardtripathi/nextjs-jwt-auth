// 'use client';

// import { useState } from 'react';
// import { useAuthStore } from '@/app/store/auth.store';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { Loader } from "lucide-react";

// export default function LoginPage() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login, isLoading, isAuthenticated } = useAuthStore();

//     const router = useRouter();

//     useEffect(() => {
//         if (isAuthenticated) {
//             router.push('/');
//         }
//     }, [isAuthenticated, router]);
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Loader className="size-10 animate-spin" />
//             </div>
//         );
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const success = await login(email, password);
//         if (success) {
//             router.push('/');
//         }
//     };

//     return (
//         <main className="container flex min-h-screen items-center justify-center">
//             <Card className="w-[350px]">
//                 <CardHeader>
//                     <CardTitle>Login</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="space-y-2">
//                             <Input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <Input
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <Button type="submit" className="w-full" disabled={isLoading}>
//                             {isLoading ? 'Loading...' : 'Login'}
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </main>
//     );
// }

// 'use client';

// import { useState } from 'react';
// import { useAuthStore } from '@/app/store/auth.store';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { Loader, Mail, Lock, ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login, isLoading, isAuthenticated } = useAuthStore();
//     const router = useRouter();

//     useEffect(() => {
//         if (isAuthenticated) {
//             router.push('/');
//         }
//     }, [isAuthenticated, router]);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <Loader className="w-12 h-12 animate-spin text-primary" />
//             </div>
//         );
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const success = await login(email, password);
//         if (success) {
//             router.push('/');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <Card className="w-[400px] shadow-lg">
//                     <CardHeader className="space-y-1">
//                         <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="space-y-2">
//                                 <div className="relative">
//                                     <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                                     <Input
//                                         type="email"
//                                         placeholder="Email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         className="pl-10"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <div className="relative">
//                                     <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                                     <Input
//                                         type="password"
//                                         placeholder="Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         className="pl-10"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <Button type="submit" className="w-full" disabled={isLoading}>
//                                 {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
//                                 {isLoading ? 'Logging in...' : 'Login'}
//                             </Button>
//                         </form>
//                     </CardContent>
//                     <CardFooter className="flex justify-center">
//                         <p className="text-sm text-muted-foreground">
//                             Do not have an account?{' '}
//                             <Link href="/register" className="text-primary hover:underline">
//                                 Register
//                             </Link>
//                         </p>
//                     </CardFooter>
//                 </Card>
//             </motion.div>
//         </div>
//     );
// }

'use client';

import { useState } from 'react';
import { useAuthStore } from '@/app/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/app/components/protected-route';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <ProtectedRoute requireAuth={false}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-[400px] shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                Do not have an account?{' '}
                                <Link href="/register" className="text-primary hover:underline">
                                    Register
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </ProtectedRoute>
    );
}

