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
  // Each opens its card in the homepage Platform section (see ExpandingCards).
  products: {
    foundation: "/#platform-foundation",
    forge: "/#platform-forge",
    workforce: "/#platform-workforce",
  },
  // Each opens its item in the homepage Use cases accordion (see Showcase).
  useCases: {
    quoting: "/#use-cases-quoting",
    costing: "/#use-cases-costing",
    supplyChain: "/#use-cases-supply-chain",
  },
  // Each opens its card in the homepage Industries section.
  industries: {
    power: "/#industries-power",
    designToManufacture: "/#industries-design-to-manufacture",
    chemicals: "/#industries-chemicals",
    distributors: "/#industries-distributors",
  },
  customers: "/#customer-story",
  research: "https://research.aeriumhq.com",
  resources: "/media-events",
  security: "/#security",
  seeItInAction: "/platform",
} as const;

export const CONTACT_EMAIL = "founders@aeriumhq.com";
export const CAL_LINK = "aeriumhq/15-minute-demo";
