// 'use client';

// import { useAuthStore } from './store/auth.store';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Loader } from 'lucide-react'

// export default function Home() {
//   const { isAuthenticated, user, isLoading } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       router.push('/');
//     }
//   }, [isAuthenticated, isLoading, router]);
//   if (isLoading) {
//     return (
//       <div className='flex items-center justify-center h-screen'>
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <main className="flex-1 container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
//           <p className="mb-4">Please log in or register to access the dashboard.</p>
//           <div className="space-x-4">
//             <Button asChild variant="outline">
//               <Link href="/login">Login</Link>
//             </Button>
//             <Button asChild>
//               <Link href="/register">Register</Link>
//             </Button>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   // Render authenticated content
//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-6">Welcome to Our App</h1>
//         <p className="mb-4">Hello, {user?.email}! You are logged in.</p>
//         <Button asChild>
//           <Link href="/dashboard">Go to Dashboard</Link>
//         </Button>
//       </main>
//     </div>
//   );

// }

'use client';

import { useAuthStore } from './store/auth.store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, ArrowRight, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <motion.main
          className="text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl font-bold mb-6 text-primary"
            variants={itemVariants}
          >
            Welcome to MyApp
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-md mx-auto text-muted-foreground"
            variants={itemVariants}
          >
            Experience the power of our platform. Log in or register to access your personalized dashboard.
          </motion.p>
          <motion.div
            className="space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/login">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/register">
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <motion.main
        className="text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl font-bold mb-6 text-primary"
          variants={itemVariants}
        >
          Welcome Back!
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-muted-foreground"
          variants={itemVariants}
        >
          Hello, {user?.email}! You are all set to explore your dashboard.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Go to Dashboard
              <LayoutDashboard className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}

