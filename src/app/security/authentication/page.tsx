import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Authentication & Access Controls | Aerium Security",
  description:
    "Enterprise-grade authentication and access control features to keep your procurement data secure. SSO, MFA, role-based access, and more.",
};

export default function AuthenticationPage() {
  const features = [
    {
      title: "Single Sign-On (SSO)",
      description:
        "Seamlessly integrate with your existing identity provider. We support SAML 2.0, OAuth 2.0, and OpenID Connect for enterprise SSO.",
    },
    {
      title: "Multi-Factor Authentication",
      description:
        "Add an extra layer of security with MFA support including authenticator apps, SMS verification, and hardware security keys.",
    },
    {
      title: "Role-Based Access Control",
      description:
        "Define granular permissions based on roles. Control who can view, edit, or approve procurement data and transactions.",
    },
    {
      title: "Session Management",
      description:
        "Automatic session timeouts, concurrent session limits, and the ability to remotely revoke access when needed.",
    },
  ];

  const accessControls = [
    {
      title: "Granular Permissions",
      items: [
        "View-only access for stakeholders",
        "Edit permissions for procurement teams",
        "Approval workflows for managers",
        "Admin controls for IT teams",
      ],
    },
    {
      title: "Audit & Compliance",
      items: [
        "Complete audit trail of all access",
        "Login history and IP tracking",
        "Failed login attempt monitoring",
        "Compliance reporting for SOC 2",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-6">
              Authentication & Access Controls
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
              Enterprise-grade security features to ensure only authorized users
              can access your procurement data.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Authentication features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-8 rounded-xl shadow-sm"
                >
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

        {/* Access Controls Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Access controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accessControls.map((control) => (
                <div
                  key={control.title}
                  className="bg-black text-white p-8 rounded-xl"
                >
                  <h3 className="text-xl font-medium mb-4">{control.title}</h3>
                  <ul className="space-y-3">
                    {control.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
