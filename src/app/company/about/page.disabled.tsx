import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "About Us | Aerium",
  description:
    "Our mission is to free supply chain teams from daily firefighting and allow them to drive growth.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-32 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-12">
            Manufacturing Advantage
          </h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe supply chain teams should spend their time focusing
                on strategic initiatives that move the business forward, not
                fighting fires to keep production moving. We give them the tools
                to focus on what really matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Our Background
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Before Aerium, we spent years at McKinsey building software to
                automate inventory management, pricing optimization, and supply
                chain workflows for some of the largest manufacturers in the
                world. We saw firsthand how much time and money was being lost
                to manual processes and disconnected systems. We started Aerium
                to bring that same level of automation to every manufacturer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Built Together
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe the best products are built together. We bring the
                platform and spend time with your team to tailor the product to
                your company&apos;s specific needs. Every business is different,
                and cookie-cutter solutions don&apos;t cut it. That&apos;s why
                we work closely with our customers to understand their unique
                challenges and build solutions that actually work.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
