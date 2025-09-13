import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  {
    title: 'Workout Plan Builder',
    description:
      'Design personalized workout routines with sets, reps, and exercises tailored to your goals.',
    pro: 0,
  },
  {
    title: 'Session Logging',
    description:
      'Track your progress in real time with timers, exercise checklists, and automatic stat recording.',
    pro: 0,
  },
  {
    title: 'Progress Analytics',
    description:
      'View detailed charts and insights that visualize your performance trends over time.',
    pro: 0,
  },
  {
    title: 'Advanced AI Recommendations',
    description:
      'Unlock PRO-level AI insights that suggest optimal workouts based on your training history.',
    pro: 1,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Power Up Your Training
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        RepMetrics offers everything from plan creation to advanced analytics —
        so whether you’re a beginner or a pro, you’ll always train smarter.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
