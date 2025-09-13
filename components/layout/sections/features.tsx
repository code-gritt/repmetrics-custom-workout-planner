import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { icons } from 'lucide-react';

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: 'Dumbbell',
    title: 'Custom Workout Planner',
    description:
      'Design personalized routines with sets, reps, and exercises that fit your exact goals and equipment.',
  },
  {
    icon: 'PlayCircle',
    title: 'Session Logging',
    description:
      'Track your workouts in real time with timers, checklists, and credits-based logging for every rep completed.',
  },
  {
    icon: 'LineChart',
    title: 'Progress Visualizations',
    description:
      'Stay motivated with dynamic charts and animations that bring your fitness journey to life.',
  },
  {
    icon: 'Users',
    title: 'Shared Plans Library',
    description:
      'Browse and adopt community-approved workout plans, or submit your own for others to use.',
  },
  {
    icon: 'CreditCard',
    title: 'Credit System & Payments',
    description:
      'Enjoy flexible usage with a credits model and seamless PayPal integration for top-ups.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure & Role-Based',
    description:
      'User and admin roles are managed with strict authentication, keeping your data and workouts safe.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes RepMetrics Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        From planning to tracking, RepMetrics gives you all the tools you need
        to measure, optimize, and celebrate your progress.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
