'use client';
import { ChevronsDown, DumbbellIcon, Github, Menu } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ToggleTheme } from './toogle-theme';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
  { href: '#faq', label: 'FAQ' },
];

const featureList: FeatureProps[] = [
  {
    title: 'Showcase Your Value',
    description: 'Highlight how your product solves user problems.',
  },
  {
    title: 'Build Trust',
    description:
      'Leverages social proof elements to establish trust and credibility.',
  },
  {
    title: 'Capture Leads',
    description:
      'Make your lead capture form visually appealing and strategically.',
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user-storage');
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="flex font-bold items-center">
        <DumbbellIcon className="p-1 w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
        <h3 className="text-2xl">RepMetrics</h3>
      </Link>

      {/* Mobile menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex font-bold items-center">
                    <DumbbellIcon className="p-1 w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
                    <h3 className="text-2xl">RepMetrics</h3>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    className="justify-start text-base"
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/dashboard');
                    }}
                  >
                    Dashboard
                  </Button>
                )}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex items-center gap-2">
        {isAuthenticated && user ? (
          <>
            <Button variant="outline" className="justify-start text-base">
              Credits: {user.credits}
            </Button>
            <Link href="/dashboard" className="text-base px-2 hover:underline">
              <Button variant="default" className="justify-start text-base">
                Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
            <Avatar>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
        <ToggleTheme />
      </div>
    </header>
  );
};
