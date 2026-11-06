import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import { GrainHeader } from "../components/site/sections";
import { CONTACT_EMAIL } from "../components/site/routes";

export const metadata: Metadata = {
  title: "Privacy Policy | Aerium",
  description: "How Aerium collects and uses information on its websites.",
};

const UPDATED = "November 5, 2026";

const contact = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPolicyPage() {
  return (
    <SiteShell navOverlay>
      <GrainHeader eyebrow="Legal" title="Privacy Policy" size="article">
        <p className="b-header-sub">Last updated {UPDATED}</p>
      </GrainHeader>

      <article className="b-white b-article">
        <div className="b-wrap">
          <div className="b-article-body b-prose-article">
            <p>
              This policy explains what information Senchi Technologies Inc. (&ldquo;Aerium&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
              collects through aeriumhq.com and research.aeriumhq.com, and how we use it. Data our customers share with us
              through the Aerium platform is governed by their agreements with us, not by this policy.
            </p>

            <h2>Information we collect</h2>
            <ul style={{ listStyle: "disc" }}>
              <li>
                <strong>Demo bookings.</strong> When you book a demo, our scheduling provider, Cal.com, collects your name,
                email address and anything else you add to the booking.
              </li>
              <li>
                <strong>Emails.</strong> If you email us, including to apply for a role, we keep your message and contact
                details.
              </li>
              <li>
                <strong>Research simulations and workshops.</strong> If you play a simulation on research.aeriumhq.com, we
                ask for your first name, last name and email address. Answers to live workshop questions are stored without
                your name. Questions you type into a simulation or demo are sent to an AI model provider to generate a
                response.
              </li>
              <li>
                <strong>Usage information.</strong> We use Vercel Analytics to understand which pages are visited, and
                Apollo.io to understand which companies visit our site. These tools may collect your IP address, browser
                type, the pages you view and, in Apollo&rsquo;s case, set cookies. Our hosting provider also keeps
                standard server logs.
              </li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our research site uses a few strictly necessary cookies, for example to remember that you signed in to a
              simulation. Our main site uses cookies set by Apollo.io for visitor analytics. You can block or delete
              cookies in your browser settings.
            </p>

            <h2>How we use information</h2>
            <p>
              We use this information to respond to you, run demos, simulations and workshops, follow up with people who
              have shown interest in Aerium, review job applications and improve our websites and research. We do not
              sell your personal information.
            </p>

            <h2>Who we share it with</h2>
            <p>
              We share information only with service providers that help us run our websites and business, such as our
              hosting, database, analytics, scheduling and AI model providers, and only so they can provide those
              services to us. We may also disclose information where the law requires it.
            </p>

            <h2>Retention and your choices</h2>
            <p>
              We keep information for as long as it is useful for the purposes above. You can ask us to access, correct
              or delete the personal information we hold about you, or to stop contacting you, at any time by emailing{" "}
              {contact}.
            </p>

            <h2>Changes</h2>
            <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>

            <h2>Contact</h2>
            <p>Questions about this policy can be sent to {contact}.</p>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
