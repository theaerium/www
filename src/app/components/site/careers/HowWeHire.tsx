import { RuledColumns, SectionIntro } from "../sections";

const STEPS = [
  { title: "Conversation with our CTO", body: "What you have built, how you think about systems, and what you want to work on next." },
  { title: "Conversation with our CEO", body: "Why Aerium, how you work with customers, and where you want to take your career." },
  { title: "Technical problem solving", body: "A working session on the kind of problem you would solve here, worked through together with the team." },
  { title: "Reverse interview", body: "Your turn. Ask us anything about the company, the product, the team, or the plan." },
];

export default function HowWeHire({ tone }: { tone: "white" | "stone" }) {
  return (
    <section className={`b-section b-${tone}`}>
      <div className="b-wrap">
        <SectionIntro
          eyebrow="How we hire"
          title="Four conversations with the people you would work with"
          lede="You will meet both founders, work through a real problem with us, and finish by asking us anything you want."
        />
        <RuledColumns items={STEPS} numbered />
      </div>
    </section>
  );
}
