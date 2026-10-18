// Central route map for the marketing site.
export const routes = {
  home: "/",
  platform: "/platform",
  solutions: {
    equipment: "/solutions/equipment-manufacturing",
    chemicals: "/solutions/specialty-chemicals",
    metal: "/solutions/metal-fabrication",
    distribution: "/solutions/distribution",
  },
  about: "/about",
  careers: "/careers",
  media: "/media-events",
  bookDemo: "/book-a-demo",
  // Destinations without a dedicated page yet point at the closest existing one.
  products: {
    foundation: "/platform",
    forge: "/platform",
    workforce: "/platform",
  },
  // Each opens its item in the homepage Use cases accordion (see Showcase).
  useCases: {
    quoting: "/#use-cases-quoting",
    costing: "/#use-cases-costing",
    supplyChain: "/#use-cases-supply-chain",
  },
  industries: {
    power: "/solutions/equipment-manufacturing",
    designToManufacture: "/solutions/metal-fabrication",
    chemicals: "/solutions/specialty-chemicals",
    distributors: "/solutions/distribution",
  },
  customers: "/#customer-story",
  research: "https://research.aeriumhq.com",
  resources: "/media-events",
  security: "/#security",
  seeItInAction: "/platform",
} as const;

export const CONTACT_EMAIL = "founders@aeriumhq.com";
export const CAL_LINK = "aeriumhq/15-minute-demo";
