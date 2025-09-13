import DiscordIcon from '@/components/icons/discord-icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <DiscordIcon className="w-16 h-16 text-[#5865F2]" />
                <div>
                  Ready to push beyond your limits with the
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    RepMetrics Community?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="lg:w-[80%] text-lg text-muted-foreground">
              The RepMetrics Discord isn’t just chat — it’s your training
              ground. Connect with athletes, coaches, and everyday lifters.
              Share your progress, swap workout plans, join live challenges, and
              stay accountable. Whether you’re chasing PRs or starting your
              first routine, you’ll find your team here.
            </CardContent>

            <CardFooter>
              <Button asChild size="lg" className="font-semibold">
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Squad 🚀
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
