'use client';
import ClientWrapper from '@/components/client-wrapper';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { user, token, logout, isAuthenticated } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://repmetrics-backend.onrender.com/api/me',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          // Update store if needed
        } else {
          toast.error('Session expired');
          logout();
          router.push('/login');
        }
      } catch (err) {
        toast.error('Server error');
        logout();
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [isAuthenticated, token, logout, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <ClientWrapper>
      <section className="container py-32">
        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome to Your Dashboard, {user?.name}
        </h2>
        <p className="text-center text-xl mb-8">
          Your current credits: {user?.credits}
        </p>
        <div className="flex justify-center gap-4">
          <Button>Create New Workout Plan</Button>
          <Button variant="outline">View Progress</Button>
        </div>
      </section>
    </ClientWrapper>
  );
}
