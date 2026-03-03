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
      "Aeri is built for industrial manufacturers and distributors, including chemicals, automotive, machinery, oil & gas, aerospace, electrical, electronics, and more.",
  },
];

export default function FAQSection() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      style={{ background: "#FAEEE8" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          style={{
            border: "2px solid #FD870B",
            boxShadow: "4px 4px 0px #FD870B",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              background: "#390007",
              padding: "0.75rem 1.5rem",
              borderBottom: "2px solid #FD870B",
            }}
          >
            <h2
              className="text-xl sm:text-2xl lg:text-3xl uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-display)",
                color: "#FFFFFF",
              }}
            >
              Common Questions
            </h2>
          </div>

          <div style={{ background: "#FFF8F5" }}>
            {faqData.map((faq, i) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isLast={i === faqData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
