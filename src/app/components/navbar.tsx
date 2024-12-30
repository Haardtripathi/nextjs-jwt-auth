// 'use client';

// import Link from 'next/link';
// import { useAuthStore } from '../store/auth.store';
// import { Button } from '@/components/ui/button';
// import { UserCircle } from 'lucide-react';

// export function Navbar() {
//     const { isAuthenticated, user, logout, isLoading } = useAuthStore();


//     return (
//         <nav className="border-b bg-background">
//             <div className="container flex h-16 items-center px-4">
//                 <Link href="/" className="font-bold">
//                     MyApp
//                 </Link>

//                 <div className="ml-auto flex items-center space-x-4">
//                     {isAuthenticated ? (
//                         <>
//                             <div className="flex items-center gap-2">
//                                 <UserCircle className="h-5 w-5" />
//                                 <span>{user?.email}</span>
//                             </div>
//                             <Button
//                                 variant="outline"
//                                 onClick={logout}
//                                 disabled={isLoading}
//                             >
//                                 Logout
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             <Button variant="ghost" asChild>
//                                 <Link href="/login">Login</Link>
//                             </Button>
//                             <Button variant="default" asChild>
//                                 <Link href="/register">Register</Link>
//                             </Button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }


'use client';

import Link from 'next/link';
import { useAuthStore } from '../store/auth.store';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const { isAuthenticated, user, logout, isLoading } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="font-bold text-2xl text-primary">
                    MyApp
                </Link>

                <div className="ml-auto flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <div className="hidden md:flex items-center gap-2">
                                <UserCircle className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">{user?.email}</span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={logout}
                                disabled={isLoading}
                                className="hidden md:inline-flex"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                                <Menu className="h-5 w-5" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild className="hidden md:inline-flex">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button variant="default" asChild className="hidden md:inline-flex">
                                <Link href="/register">Register</Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                                <Menu className="h-5 w-5" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-16 inset-x-0 bg-background border-b"
                    >
                        <div className="container py-4 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-2 py-2">
                                        <UserCircle className="h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">{user?.email}</span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        disabled={isLoading}
                                        className="w-full"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild className="w-full">
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                    </Button>
                                    <Button variant="default" asChild className="w-full">
                                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

