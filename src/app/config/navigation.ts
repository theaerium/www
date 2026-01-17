export interface NavSubItem {
  label: string;
  href: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems: NavSubItem[];
}

export const navigationConfig: NavItem[] = [
  {
    label: "Platform",
    href: "",
    subItems: [
      {
        label: "Ingestion",
        href: "/platform/ingestion",
        description: "Connect all your data into a single source of truth",
      },
      {
        label: "RFQ Orchestration",
        href: "/platform/rfq",
        description: "Streamline rfqs across suppliers",
      },
      {
        label: "Cost Intelligence",
        href: "/platform/cost",
        description: "Data-driven pricing insights and market analytics",
      },
    ],
  },
  {
    label: "Security",
    href: "/security/data-protection",
    subItems: [
      {
        label: "Data Protection",
        href: "/security/data-protection",
        description: "Enterprise-grade encryption and privacy controls",
      },
      // {
      //   label: "Compliance",
      //   href: "/security/compliance",
      //   description: "SOC 2, GDPR, and industry-standard certifications",
      // },
      // {
      //   label: "Authentication",
      //   href: "/security/authentication",
      //   description: "Multi-factor auth and secure access management",
      // },
    ],
  },
  {
    label: "Company",
    href: "/company",
    subItems: [
      {
        label: "About Us",
        href: "/company",
        description: "Our mission to accelerate manufcaturing",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Join our team and shape the future of manufacturing",
      },
      // {
      //   label: "Blog",
      //   href: "/blog",
      //   description: "Insights, updates, and industry perspectives",
      // },
    ],
  },
];
