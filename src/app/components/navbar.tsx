'use client';

import Link from 'next/link';
import { useAuthStore } from '../store/auth.store';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export function Navbar() {
    const { isAuthenticated, user, logout, isLoading } = useAuthStore();


    return (
        <nav className="border-b bg-background">
            <div className="container flex h-16 items-center px-4">
                <Link href="/" className="font-bold">
                    MyApp
                </Link>

                <div className="ml-auto flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-5 w-5" />
                                <span>{user?.email}</span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={logout}
                                disabled={isLoading}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button variant="default" asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

