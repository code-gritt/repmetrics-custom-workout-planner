import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { icons } from 'lucide-react';

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Dumbbell',
    title: 'Personalized Plans',
    description:
      'Create custom workout routines tailored to your goals, fitness level, and available equipment — all in just a few clicks.',
  },
  {
    icon: 'LineChart',
    title: 'Progress Tracking',
    description:
      'Stay motivated with real-time charts, stats, and insights that visualize your reps, sets, and consistency over time.',
  },
  {
    icon: 'Wallet',
    title: 'Credit-Based Flexibility',
    description:
      'Only pay for what you use with our credits system — from workout plans to advanced analytics, you stay in control.',
  },
  {
    icon: 'Sparkle',
    title: 'Engaging Experience',
    description:
      'Enjoy dynamic animations and real-time updates that make logging workouts and reviewing progress feel fun and rewarding.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RepMetrics?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            RepMetrics isn’t just another workout app — it’s your end-to-end
            platform for planning, tracking, and optimizing every rep of your
            fitness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
