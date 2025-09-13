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

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="#" className="flex font-bold items-center">
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
                  <Link href="#" className="flex font-bold items-center">
                    <DumbbellIcon className="p-1 w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
                    <h3 className="text-2xl">RepMetrics</h3>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop menu */}
      <nav className="hidden lg:flex items-center space-x-4 relative">
        {/* Features dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsFeaturesOpen(true)}
          onMouseLeave={() => setIsFeaturesOpen(false)}
        >
          <button className="px-3 py-2 bg-card rounded text-base flex items-center gap-1">
            Features <ChevronsDown className="h-3 w-3" />
          </button>
          {isFeaturesOpen && (
            <div className="absolute top-full mt-2 w-[600px] bg-card shadow-md rounded-md p-4 grid grid-cols-2 gap-5 z-50">
              <Image
                src="https://avatars.githubusercontent.com/u/75042455?v=4"
                alt="RadixLogo"
                className="h-full w-full rounded-md object-cover"
                width={600}
                height={600}
              />
              <ul className="flex flex-col gap-2">
                {featureList.map(({ title, description }) => (
                  <li
                    key={title}
                    className="rounded-md p-3 text-sm hover:bg-muted"
                  >
                    <p className="mb-1 font-semibold leading-none text-foreground">
                      {title}
                    </p>
                    <p className="line-clamp-2 text-muted-foreground">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Other links */}
        {routeList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-base px-2 hover:underline"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-2">
        <ToggleTheme />
      </div>
    </header>
  );
};
