/**
 * Thematic stock photography (Unsplash) for public pages until official HKUAA assets are wired in.
 * Search intent: clubhouse / dining, alumni events, news & communications.
 */

export const PAGE_THEME_IMAGES = {
  /** Clubhouse — upscale dining room, Central-style ambience */
  clubhouseHero:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85",
  /** Local asset — HKUAA dining photography */
  clubhouseDiningCard: "/assets/dining.png",
  clubhouseLoungeCard:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85",
  /** Events — conference / reception */
  eventsHero:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=85",
  /** News — editorial / briefing */
  newsHero:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2000&q=85",
} as const;
