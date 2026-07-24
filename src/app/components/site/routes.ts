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
} as const;

export const CONTACT_EMAIL = "founders@aeriumhq.com";
export const CAL_LINK = "aeriumhq/15-minute-demo";
