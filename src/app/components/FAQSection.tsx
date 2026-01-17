"use client";

import FAQItem from "./faq/FAQItem";

const faqData = [
  {
    id: 1,
    question: "Can Aerium integrate with all my different systems?",
    answer:
      "Yes. The platform connects to Excel, CSVs (either uploaded or through sharepoint), most ERPs (Epicor, SAP, Oracle), and supports custom integrations",
  },
  {
    id: 2,
    question: "Will you help us integrate the platform?", // TODO: Reframe the question
    answer:
      "Yes. We spend the first 2-6 weeks meeting with the team on-site to integrate data sources and get the product running",
  },
  {
    id: 3,
    question: "How long until we see ROI / EBITDA impact?",
    answer:
      "Typically we expect impacts to hit the P&L after about 6 months after the integration is complete",
  },
  {
    id: 4,
    question: "What industries do you work with?",
    answer:
      "Our platform is built for manufacturers across many industries including automotive, aerospace, chemicals, industrial machinery and more",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 ">
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black text-left">
            Common questions
          </h2>
        </div>

        <div className="w-full">
          {faqData.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
