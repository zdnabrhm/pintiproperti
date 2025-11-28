import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    slug: "how-can-i-buy-without-equity",
    question: "How can I buy without equity?",
    answer:
      "We partner with lenders who finance the down payment. You pay it back through rental income. We explain the exact model in your free consultation.",
  },
  {
    slug: "do-i-need-permanent-residency",
    question: "Do I need permanent residency or German citizenship?",
    answer:
      "No. Most of our clients are on work visas. Banks care more about stable income and employment contracts than citizenship. We work with lenders who understand expat situations.",
  },
  {
    slug: "how-long-does-buying-take",
    question: "How long does the buying process take?",
    answer:
      "Typically 2-4 months from consultation to keys in hand. This includes financing approval, property search, notary appointment, and registration. Some clients close in as little as 6 weeks.",
  },
  {
    slug: "what-are-monthly-costs",
    question: "What are the monthly costs besides the mortgage?",
    answer:
      "Expect Hausgeld (building maintenance) of €200-400/month, property insurance €30-50/month, and a reserve fund for repairs. Rental income typically covers all of this plus your mortgage payment.",
  },
  {
    slug: "what-if-no-tenant",
    question: "What happens if I can't find a tenant?",
    answer:
      "We pre-vet properties in high-demand areas where vacancy is rare. Plus, we connect you with professional property managers who handle tenant placement. Average vacancy in our portfolio is under 3%.",
  },
  {
    slug: "how-does-afa-work",
    question: "How do the tax deductions (AfA) actually work?",
    answer:
      "You deduct 2-4% of the building value annually from your taxable income. For a €250K property, that's €4,000-8,000/year in deductions, saving you €1,600-3,200 in taxes (at 40% tax rate). Your Steuerberater handles the filing.",
  },
  {
    slug: "do-i-need-german",
    question: "Do I need to speak German?",
    answer:
      "Not at all. We handle bank meetings, notary appointments, and all documentation in English. Our team translates everything and explains each step in plain language.",
  },
  {
    slug: "which-cities-covered",
    question: "Which cities/regions do you cover?",
    answer:
      "We focus on Bavaria and Baden-Württemberg — primarily Munich, Stuttgart, Nuremberg, and surrounding growth areas. These markets have strong fundamentals: job growth, housing demand, and stable appreciation.",
  },
  {
    slug: "what-if-i-leave-germany",
    question: "What if I leave Germany in a few years?",
    answer:
      "You can keep the property and hire a management company (we help set this up), or sell it. Many clients build portfolios specifically as retirement income, managing remotely from abroad.",
  },
  {
    slug: "is-consultation-really-free",
    question: "Is the consultation really free with no obligation?",
    answer:
      "Yes. Zero cost, zero pressure. We walk you through your specific situation, show you the numbers, and answer all questions. You decide if it makes sense for you. No hidden fees or commitments.",
  },
];

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible defaultValue={QUESTIONS[0].slug}>
      {QUESTIONS.map(({ slug, question, answer }) => (
        <AccordionItem key={slug} value={slug}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
