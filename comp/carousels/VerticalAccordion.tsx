"use client";

import {
    CurrencyDollarIcon,
    PlayIcon,
    BellIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";

const items = [
    {
        id: 1,
        title: "Earn more",
        Icon: CurrencyDollarIcon,
        imgSrc:
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1740&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        id: 2,
        title: "Play more",
        Icon: PlayIcon,
        imgSrc:
            "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=688&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        id: 3,
        title: "Keep track",
        Icon: BellIcon,
        imgSrc:
            "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?auto=format&fit=crop&w=870&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        id: 4,
        title: "Grow faster",
        Icon: ChartBarIcon,
        imgSrc:
            "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1740&q=80",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
];

export default function VerticalAccordion() {
    const [open, setOpen] = useState(items[0].id);

    return (
        <section className="p-4 bg-indigo-600">
            <div className="flex flex-col lg:flex-row h-fit lg:h-112.5 w-full max-w-6xl mx-auto shadow overflow-hidden">
                {items.map((item) => (
                    <Panel
                        key={item.id}
                        open={open}
                        setOpen={setOpen}
                        id={item.id}
                        Icon={item.Icon}
                        title={item.title}
                        imgSrc={item.imgSrc}
                        description={item.description}
                    />
                ))}
            </div>
        </section>
    );
}

interface PanelProps {
    open: number;
    setOpen: Dispatch<SetStateAction<number>>;
    id: number;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    imgSrc: string;
    description: string;
}

const Panel = ({
    open,
    setOpen,
    id,
    Icon,
    title,
    imgSrc,
    description,
}: PanelProps) => {
    const isOpen = open === id;

    return (
        <>
            <button
                className="bg-white hover:bg-slate-50 transition-colors p-3 border-r border-b border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
                onClick={() => setOpen(id)}
            >
                <span
                    style={{ writingMode: "vertical-lr" }}
                    className="hidden lg:block text-xl font-light rotate-180"
                >
                    {title}
                </span>

                <span className="block lg:hidden text-xl font-light">{title}</span>

                <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>

                <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r border-b lg:border-b-0 lg:border-t border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
            </button>

            <div
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className={`
          relative bg-black flex items-end overflow-hidden
          transition-all duration-500 ease-in-out
          w-full
          ${isOpen ? "h-50 opacity-100" : "h-0 opacity-75"}
          lg:h-full
          ${isOpen ? "lg:w-full" : "lg:w-0"}
        `}
            >
                <div
                    className={`
            px-4 py-2 bg-black/40 backdrop-blur-sm text-white
            transition-all duration-300 delay-150
            ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
                >
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
};
