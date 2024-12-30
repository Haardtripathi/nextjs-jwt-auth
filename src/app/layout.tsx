"use client"
import { Toaster } from 'react-hot-toast';
import { AuthInitializer } from './components/auth/auth-initializer';
import { Navbar } from './components/navbar';
import './globals.css';
import { useAuthStore } from './store/auth.store';
import { Loader } from 'lucide-react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuthStore();

  return (
    <html lang="en">
      <body>
        <AuthInitializer />
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
          </div>
        )}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

