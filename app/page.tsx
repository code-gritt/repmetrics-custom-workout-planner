import { BenefitsSection } from '@/components/layout/sections/benefits';
import { CommunitySection } from '@/components/layout/sections/community';
import { ContactSection } from '@/components/layout/sections/contact';
import { FAQSection } from '@/components/layout/sections/faq';
import { FeaturesSection } from '@/components/layout/sections/features';
import { FooterSection } from '@/components/layout/sections/footer';
import { HeroSection } from '@/components/layout/sections/hero';
import { PricingSection } from '@/components/layout/sections/pricing';
import { ServicesSection } from '@/components/layout/sections/services';
import { TestimonialSection } from '@/components/layout/sections/testimonial';

export const metadata = {
  title: 'RepMetrics - Custom Workout Planner',
  description:
    'RepMetrics is a SaaS platform for creating personalized workout routines with dynamic visualizations, progress tracking, and real-time insights.',
  openGraph: {
    type: 'website',
    url: 'https://github.com/nobruf/shadcn-landing-page.git',
    title: 'RepMetrics - Custom Workout Planner',
    description:
      'Design, track, and optimize your fitness journey with RepMetrics. Build custom workout plans, monitor progress, and stay motivated.',
    images: [
      {
        url: 'https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg',
        width: 1200,
        height: 630,
        alt: 'RepMetrics - Custom Workout Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://github.com/code-gritt/repmetrics-custom-workout-planner',
    title: 'RepMetrics - Custom Workout Planner',
    description:
      'RepMetrics helps you plan smarter workouts, track every rep, and visualize progress like never before.',
    images: [
      'https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg',
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
