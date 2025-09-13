'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://i.pravatar.cc/150?img=10',
    name: 'Michael Carter',
    userName: 'Fitness Coach',
    comment:
      'RepMetrics makes programming workouts for my clients 10x easier. The progress analytics are game-changing.',
    rating: 5.0,
  },
  {
    image: 'https://i.pravatar.cc/150?img=32',
    name: 'Sophia Johnson',
    userName: 'Beginner Lifter',
    comment:
      'I love how simple it is to log my workouts. Seeing my strength go up week by week keeps me motivated.',
    rating: 4.8,
  },
  {
    image: 'https://i.pravatar.cc/150?img=25',
    name: 'Ethan Walker',
    userName: 'Data Analyst',
    comment:
      'The charts and metrics help me track everything — sets, reps, and even volume. It’s like having a personal trainer.',
    rating: 4.9,
  },
  {
    image: 'https://i.pravatar.cc/150?img=47',
    name: 'Olivia Martinez',
    userName: 'CrossFit Athlete',
    comment:
      'RepMetrics gives me a clear edge in my training. The AI recommendations are incredibly accurate.',
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Trusted by 1000+ Athletes & Coaches
        </h2>
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  {/* ⭐ Dynamic star rendering */}
                  <div className="flex gap-1 pb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(review.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>
                        {review.name[0]}
                        {review.name.split(' ')[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
