import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Data Protection & Encryption | Aerium Security",
  description:
    "Your data is protected with industry-leading encryption, secure infrastructure, and comprehensive data protection policies.",
};

function SectionCard({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
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
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: "#FD870B" }}
        >
          {label}
        </span>
      </div>
      <div className="p-8 sm:p-10" style={{ background: "#FFF8F5" }}>
        <h2
          className="text-3xl sm:text-4xl mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "#390007",
          }}
        >
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bevel-box"
              style={{ borderLeft: "3px solid #FD870B" }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#390007" }}
              >
                {item.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "#6B3030" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DataProtectionPage() {
  const encryptionFeatures = [
    {
      title: "Encryption at Rest",
      description:
        "All data stored in our systems is encrypted using AES-256 encryption, the same standard used by banks and government agencies.",
    },
    {
      title: "Encryption in Transit",
      description:
        "All data transmitted between your systems and Aerium is protected with TLS 1.3, ensuring secure communication at all times.",
    },
    {
      title: "Key Management",
      description:
        "Enterprise customers can manage their own encryption keys or use our secure key management service with automatic key rotation.",
    },
    {
      title: "On-Premise Deployment",
      description:
        "For organizations with strict security requirements, we offer on-premise deployment options so your data never leaves your infrastructure.",
    },
  ];

  const protectionPolicies = [
    {
      title: "Flexible Deployment Options",
      description:
        "Choose between our secure cloud infrastructure or deploy on-premise within your own environment. We adapt to your security requirements.",
    },
    {
      title: "Data Residency",
      description:
        "Choose where your data is stored. We offer data residency options in the US and Canada, or keep it entirely on your own servers.",
    },
    {
      title: "Data Isolation",
      description:
        "Your data is logically isolated from other customers with strict access controls and separate encryption keys, or fully isolated with on-premise deployment.",
    },
    {
      title: "Data Portability",
      description:
        "Export your data at any time in standard formats. Your data belongs to you, and you can take it with you if you leave.",
    },
  ];

  const accessControls = [
    {
      title: "Role-Based Access Control",
      description:
        "Define granular permissions based on job functions. Control who can view, edit, or approve data at every level.",
    },
    {
      title: "Custom Permission Sets",
      description:
        "Create custom roles tailored to your organization's structure. Assign permissions by department, project, or spend category.",
    },
    {
      title: "Approval Workflows",
      description:
        "Configure multi-level approval chains with automatic routing based on spend thresholds, categories, or business units.",
    },
    {
      title: "Audit Logging",
      description:
        "Complete visibility into who accessed what and when. Every action is logged and available for compliance reporting.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FFF8F5" }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs uppercase tracking-widest font-bold mb-4"
              style={{ color: "#FD870B" }}
            >
              Security
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "#390007",
              }}
            >
              Data Protection & Encryption
            </h1>
            <p
              className="text-xl sm:text-2xl leading-relaxed"
              style={{ color: "#6B3030" }}
            >
              Your data is protected with industry-leading encryption and
              comprehensive data protection policies.
            </p>
            <hr className="fancy mx-auto mt-8" style={{ maxWidth: "200px" }} />
          </div>
        </section>

        {/* Sections */}
        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <SectionCard
              label="Encryption"
              title="Encryption standards"
              items={encryptionFeatures}
            />
            <SectionCard
              label="Data Protection"
              title="Data protection policies"
              items={protectionPolicies}
            />
            <SectionCard
              label="Access Controls"
              title="Access controls"
              items={accessControls}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
