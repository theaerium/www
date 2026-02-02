import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Data Protection & Encryption | Aerium Security",
  description:
    "Your data is protected with industry-leading encryption, secure infrastructure, and comprehensive data protection policies.",
};

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

  const certifications = [
    "SOC 2 Type II",
    "ISO 27001",
    "GDPR Compliant",
    "CCPA Compliant",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-6">
              Data Protection & Encryption
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
              Your data is protected with industry-leading encryption and
              comprehensive data protection policies.
            </p>
          </div>
        </section>

        {/* Encryption Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Encryption standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {encryptionFeatures.map((feature) => (
                <div key={feature.title} className="p-8 rounded-xl">
                  <h3 className="text-xl font-medium text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Policies Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Data protection policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {protectionPolicies.map((policy) => (
                <div key={policy.title} className="p-8 rounded-xl">
                  <h3 className="text-xl font-medium text-black mb-3">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access Controls Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Access controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accessControls.map((control) => (
                <div key={control.title} className="p-8 rounded-xl">
                  <h3 className="text-xl font-medium text-black mb-3">
                    {control.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {control.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section - one day! */}
        {/*<section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-medium mb-8">
              Certifications & Compliance
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              We maintain industry-recognized certifications to demonstrate our
              commitment to security and compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-6 py-3 bg-white/10 rounded-full text-white font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>*/}
      </main>
      <Footer />
    </div>
  );
}
