// import { NavGroup } from "@/types/navigation";

import { NavGroup, NavItem } from "../types/type";


export const sections: NavItem[] = [
    { label: "FAQ", href: "/components/faq", },
    { label: "Testimonials", href: "/components/testimonials" },
    { label: "Modalities", href: "/components/modalities", tag: "new" },
];


export const components: NavItem[] = [
    { label: "Accordions", href: "/components/accordions", },
    { label: "Carousels", href: "/components/carousels" },
    { label: "Links", href: "/components/links", tag: "new" },
];


export const NAVIGATION: NavGroup[] = [
    {
        title: "Main",
        items: [{ label: "All components", href: "/components" }],
    },
    {
        title: "Sections",
        items: sections
    },
    {
        title: "Components",
        items: components
    },
];

