import type { HeroSlide } from "./HeroMedia";

// Platform hero clips, also used behind the Home hero. Three unique clips;
// equipment is framed slightly lower (objectPosition).
export const PLATFORM_HERO_SLIDES: HeroSlide[] = [
  { video: "/site/videos/platform-equipment.mp4", poster: "/site/images/equipment.jpg", objectPosition: "50% 62%", resume: true }, // 0
  { video: "/site/videos/platform-chemicals.mp4", poster: "/site/images/specialty-chemicals.jpg" }, // 1
  { video: "/site/videos/platform-distribution.mp4", poster: "/site/images/distribution.jpg" }, // 2
];

// Rotation order: equipment, chemical, distribution, metal fab (= equipment).
// The metal-fab step wraps straight into the top equipment step (same clip,
// back to back, no crossfade), so equipment plays ~20s continuously across the
// loop. The long equipment clip is one mounted element that resumes where it
// left off. 10s per step.
export const PLATFORM_HERO_SEQUENCE = [0, 1, 2, 0];
export const PLATFORM_HERO_INTERVAL_MS = 10000;
