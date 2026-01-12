'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader } from 'lucide-react';

export default function AdminRootPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      // No session, redirect to home
      router.push('/');
      return;
    }

    if (session.user?.role === 'admin') {
      // Admin user, redirect to dashboard
      router.push('/admin/dashboard');
    } else {
      // Non-admin user, redirect to home
      router.push('/');
    }
  }, [session, status, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Loader className="animate-spin h-12 w-12 text-orange-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Redirecting...</p>
      </div>
    </div>
  );
}