import { RecentSearch } from "@/app/types/type";


const RECENT_KEY = "recent-searches";
const MAX_RECENT = 6;

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveRecentSearch(item: RecentSearch) {
  if (typeof window === "undefined") return;

  const prev = getRecentSearches();
  const filtered = prev.filter((i) => i.url !== item.url);
  const next = [item, ...filtered].slice(0, MAX_RECENT);

  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}
