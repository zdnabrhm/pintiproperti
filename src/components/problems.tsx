import { BanIcon } from "lucide-react";

const PROBLEMS = [
  {
    title: "The housing shortage is getting worse",
    description:
      "Munich's rental market is brutal. Apartments disappear within hours, and buying seems impossible without local knowledge.",
  },
  {
    title: "Banks don't make it easy for expats",
    description:
      "German financing is confusing. Most banks want 20-30% down payment + proof of long-term residency. You're basically locked out.",
  },
  {
    title: "Waiting = getting priced out",
    description:
      "Bavarian property prices rise 5-8% annually. Every year you wait, you need an extra €20,000+ in equity.",
  },
  {
    title: "No one to guide you through the chaos",
    description:
      "German bureaucracy is wild. Notaries, land registry, financing documents in German — one mistake costs you months and thousands.",
  },
];

export function Problems() {
  return (
    <section id="problems" className="px-5 py-16 lg:px-8">
      <h2 className="font-montserrat m-auto max-w-2xl text-center text-4xl font-semibold text-balance">
        Why International <span className="text-accent-300">Professionals</span>{" "}
        Need to Act Now
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {PROBLEMS.map(({ title, description }) => (
          <div key={title} className="flex gap-5">
            <div className="from-accent-300 to-accent-400 h-fit rounded-[6px] bg-linear-to-b p-0.5">
              <BanIcon className="size-10 stroke-neutral-900 p-2" />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-neutral-100">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
