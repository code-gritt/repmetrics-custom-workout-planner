const animate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        square1: {
          '0%': { left: '0px', top: '0px' },
          '8.333%': { left: '0px', top: '30px' },
          '100%': { left: '0px', top: '30px' },
        },
        square2: {
          '0%': { left: '0px', top: '30px' },
          '8.333%': { left: '0px', top: '60px' },
          '16.67%': { left: '30px', top: '60px' },
          '25%': { left: '30px', top: '30px' },
          '83.33%': { left: '30px', top: '30px' },
          '91.67%': { left: '30px', top: '0px' },
          '100%': { left: '0px', top: '0px' },
        },
        square3: {
          '0%,100%': { left: '30px', top: '30px' },
          '25%': { left: '30px', top: '0px' },
          '33.33%': { left: '60px', top: '0px' },
          '41.67%': { left: '60px', top: '30px' },
          '75%': { left: '60px', top: '60px' },
          '83.33%': { left: '30px', top: '60px' },
          '91.67%': { left: '30px', top: '30px' },
        },
        square4: {
          '0%': { left: '60px', top: '30px' },
          '41.67%': { left: '60px', top: '60px' },
          '50%': { left: '90px', top: '60px' },
          '58.33%': { left: '90px', top: '30px' },
          '100%': { left: '90px', top: '30px' },
        },
        square5: {
          '0%': { left: '90px', top: '30px' },
          '58.33%': { left: '90px', top: '0px' },
          '66.67%': { left: '60px', top: '0px' },
          '75%': { left: '60px', top: '30px' },
          '100%': { left: '60px', top: '30px' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
        square1: 'square1 2.4s ease-in-out infinite',
        square2: 'square2 2.4s ease-in-out infinite',
        square3: 'square3 2.4s ease-in-out infinite',
        square4: 'square4 2.4s ease-in-out infinite',
        square5: 'square5 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
};
