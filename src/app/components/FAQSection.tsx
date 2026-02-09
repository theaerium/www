"use client";

import FAQItem from "./faq/FAQItem";

const faqData = [
  {
    id: 1,
    question: "Can Aerium integrate with all my different systems?",
    answer:
      "Yes, Aeri can connect to all of your existing data systems. This includes your Excel/CSV files, ERP, MDM, MES, other AI systems, and custom integrations.",
  },
  {
    id: 2,
    question: "Will you help us integrate the platform?",
    answer:
      "Yes, we spend the first 2-6 weeks on-site to integrate data sources and get Aeri running. We deploy securely in your environment and do not require any IT internal builds.",
  },
  {
    id: 3,
    question: "How long until we see ROI / EBITDA impact?",
    answer: "Typically we expect to hit positive ROI in 6 months or less.",
  },
  {
    id: 4,
    question: "What industries do you work with?",
    answer:
      "Aeri is built for industrial manufacturers which includes chemicals, automotive, machinery, oil & gas, aerospace, electronics, and more.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-black mb-12">
          Common questions
        </h2>

        <div className="divide-y divide-gray-200">
          {faqData.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
