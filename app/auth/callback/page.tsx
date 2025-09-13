'use client';
import { Loader } from '@/components/ui/loader';
import { useUserStore } from '@/lib/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Decode token or fetch /me to get user data
      fetch('https://repmetrics-backend.onrender.com/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data, token);
          toast.success('Google login successful');
          router.push('/dashboard');
        })
        .catch((err) => {
          toast.error('Authentication failed');
          router.push('/login');
        });
    } else {
      toast.error('No token provided');
      router.push('/login');
    }
  }, [searchParams, setUser, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}
