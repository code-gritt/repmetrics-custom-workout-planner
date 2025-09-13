'use client';
import React from 'react';
import * as lucideIcons from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof lucideIcons;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  // Ensure it's actually a component
  const LucideIconComponent = lucideIcons[name] as
    | React.ElementType<LucideProps>
    | undefined;

  if (!LucideIconComponent) {
    console.warn(`Icon "${name}" does not exist in lucide-react`);
    return null;
  }

  return (
    <LucideIconComponent
      size={size}
      color={color}
      className={className}
      {...props}
    />
  );
};
