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
  useCases: {
    quoting: "/#use-cases",
    costing: "/#use-cases",
    supplyChain: "/#use-cases",
  },
  industries: {
    power: "/solutions/equipment-manufacturing",
    designToManufacture: "/solutions/metal-fabrication",
    chemicals: "/solutions/specialty-chemicals",
    dataCenters: "#",
  },
  customers: "/#customer-story",
  research: "#",
  resources: "/media-events",
  security: "/#security",
  seeItInAction: "/platform",
} as const;

export const CONTACT_EMAIL = "founders@aeriumhq.com";
export const CAL_LINK = "aeriumhq/15-minute-demo";
