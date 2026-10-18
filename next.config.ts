import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/condition-and-eligibility-guidelines",
        destination: "/legal/condition-eligibility",
        permanent: true,
      },
      {
        source: "/anti-money-laundering",
        destination: "/legal/anti-money-laundering",
        permanent: true,
      },
      {
        source: "/photo-guidelines",
        destination: "/legal/photo-guidelines",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      // Also redirect existing root-level pages to legal section
      {
        source: "/condition-eligibility",
        destination: "/legal/condition-eligibility",
        permanent: true,
      },
      // The seed round announcement moved to the markdown news template; keep the published link working.
      {
        source: "/media-events/aerium-raises-2-5-million",
        destination: "/news/aerium-raises-seed-round",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
