import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'Can I create a custom workout plan?',
    answer:
      "Absolutely! RepMetrics allows you to design personalized workout routines tailored to your fitness goals, whether it's strength, cardio, or flexibility.",
    value: 'item-1',
  },
  {
    question: 'How does the credit system work?',
    answer:
      'You start with 100 free credits. Each action, like creating a plan or logging a workout, consumes credits. You can top up anytime via PayPal to continue using premium features.',
    value: 'item-2',
  },
  {
    question: 'Can I track my progress over time?',
    answer:
      'Yes! RepMetrics provides dynamic visualizations and progress animations so you can monitor reps, sessions completed, and overall fitness improvement.',
    value: 'item-3',
  },
  {
    question: 'Are there shared workout plans?',
    answer:
      'Definitely. You can browse and adopt public workout plans approved by admins to try routines designed by other users or fitness experts.',
    value: 'item-4',
  },
  {
    question: 'Is RepMetrics suitable for beginners?',
    answer:
      'Yes. Our platform supports users of all levels with beginner-friendly exercises, tutorials, and customizable plans to gradually advance your fitness journey.',
    value: 'item-5',
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Your Questions, Answered
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
