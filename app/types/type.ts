export type TagType = "new" | "beta" | "soon";

export interface NavItem {
    label: string;
    href: string;
    tag?: TagType;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}



export type RecentSearch = {
    label: string;
    url: string;
    tag?: string;
};




/** Group (Sections, Components, future groups) */
export interface SearchGroup {
    title: string;
    items: NavItem[];
}

/** Single search result item (flattened) */
export interface SearchResultItem {
    id: number;
    title: string;
    url: string;
    tag?: TagType;
}

/** Grouped search result */
export interface GroupedSearchResult {
    title: string;
    results: SearchResultItem[];
}
