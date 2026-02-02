export interface NavSubItem {
  label: string;
  href: string;
  description: string;
}

export interface NavItem {
  label: string;
  heading: string;
  subItems: NavSubItem[];
}

export const navigationConfig: NavItem[] = [
  {
    label: "Platform",
    heading: "AI supply chain analyst",
    subItems: [
      {
        label: "Sentinel",
        href: "/",
        description:
          "Understand the real costs of your business. Advanced forecasting of feedstock and import costs to provide unparalleled insight into landed costs and identifying savings opportunities.",
      },
      {
        label: "Orchestrator",
        href: "/",
        description:
          "Get your inputs when you need them. Automate sourcing, purchasing, and RFQs to ensure the line never goes down. Ingest any document format and conduct analysis to identify savings opportunities.",
      },
      {
        label: "Concierge",
        href: "/",
        description:
          "Manage supplier relationships from your inbox. Ask questions, start tasks, and run your supply chain the same way you do today - via email or teams.",
      },
    ],
  },
  {
    label: "Security",
    heading: "Stay in control of your data",
    subItems: [
      {
        label: "Security",
        href: "/security/data-protection",
        description:
          "Enterprise-grade encryption and privacy controls. Deployments can be done on-prem to ensure data never leaves your servers.",
      },
    ],
  },
  {
    label: "Company",
    heading: "Manufacturing advantage",
    subItems: [
      {
        label: "About Us",
        href: "/company",
        description: "Our mission to accelerate manufacturing",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Join our team and shape the future of manufacturing",
      },
    ],
  },
];
